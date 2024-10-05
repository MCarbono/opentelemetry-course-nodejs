import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ParentBasedSampler, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-base'
import { OurSampler } from "./ourSampler";
import {W3CBaggagePropagator, W3CTraceContextPropagator, CompositePropagator} from '@opentelemetry/core'

function start(serviceName: string) {
    const { endpoint, port } = PrometheusExporter.DEFAULT_OPTIONS;
    const exporter = new PrometheusExporter({}, () => {
        console.log(`prometheus scrape endpoint: http://localhost:${port}/${endpoint}`)
    })
    const meterProvider = new MeterProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName
        })
    })
    meterProvider.addMetricReader(exporter)
    const meter = meterProvider.getMeter('me-service-meter')
    const traceExporter = new OTLPTraceExporter({
        url: 'http://jaeger:4318/v1/traces'
    })

    const sdk = new NodeSDK({
        traceExporter,
        serviceName: serviceName,
        instrumentations: [getNodeAutoInstrumentations({
            "@opentelemetry/instrumentation-fs": {
                enabled: false
            }
        })],
        autoDetectResources: true,
        resource: new Resource({
            'team.owner': 'core-team',
            'deployment': '4'
        }),
        sampler: new ParentBasedSampler({
            root: new OurSampler()
        }),
        textMapPropagator: new CompositePropagator({
            propagators: [new W3CTraceContextPropagator(), new W3CBaggagePropagator()]
        })
    })

    sdk.start();

    return meter
}

export default start
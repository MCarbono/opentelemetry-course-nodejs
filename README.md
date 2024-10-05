<h1 align="center">Observability using Opentelemetry</h1>

## 📜 Summary
- [About](#About)
- [Run](#Run)
- [Endpoints](#Endpoints)
- [Tracing](#Tracing)

<a id="About"></a> 
## 📃 About
This code was developed based on the course of Observability in Cloud Native apps using OpenTelemetry from Udemy. 
The course teach us about the basic of observability using OTEL resources with two apps using Node.js.
To know more about it click <a href="https://www.udemy.com/course/observability-in-cloud-native-apps-using-opentelemetry/">here</a>

---
<a id="Run"></a> 
## ⚙️ Run

To run the project is necessary Docker. With it we run our 2 applications, a redis database, jaeger to tracing, prometheus to
metrics and the OTEL collector. Run the command below:

```
    make infra_up
```

to destroy it all after, run the command below:

```
    make infra_down
```

<a id="Endpoints"></a> 
## 💻 Endpoints

List all the tasks

run the Makefile command below or use the curl:

```bash
    make request
```

```
    curl --location 'localhost:8081/todos'
```

Response:

http statusCode: 200

```
    {
    "todos": [
        {
            "name": "You are OpenTelemetry master!"
        },
        {
            "name": "Configure sampling rule"
        },
        {
            "name": "Deploy OpenTelemetry Collector"
        },
        {
            "name": "Install OpenTelemetry SDK"
        }
    ],
    "user": {
        "username": "Username",
        "userId": 123
    },
    "trace": {
        "spanId": "73e9a7f33cc30011",
        "traceId": "fee0f563146f05acb9daa2a6c2816cde",
        "traceFlag": 1
    }
}
```
---

<a id="Tracing"></a> 
## 🔬 Tracing

To check all the spans from the tracing of the request, copy the traceId from the endpoint response body and
in your browser type the address: localhost:16686. After it, on the "Lookup by trace ID" paste the traceId.


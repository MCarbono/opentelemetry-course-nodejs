import start from "./tracer"
import opentelemetry from "@opentelemetry/api";
start('auth-service')
import express from 'express';
const app = express();

app.get('/auth',(req,res)=>{
    const baggage = opentelemetry.propagation.getActiveBaggage()
    console.log('baggage', baggage)
    res.json({username: 'Marcelo Carbono', userId: 123})
    opentelemetry.trace.getActiveSpan()?.setAttribute('userId', 123)
})

app.listen(8080, () => {
    console.log('service is up and running!');
})
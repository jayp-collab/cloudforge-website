exports.handler = async function(event, context) {
    try {
    // Checks if the requst is a POST or not. Only POST requests should be accepted for security and authorization purposes.
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({error: "Method not allowed"})
        };
    } 

    const { message } = JSON.parse(event.body);


    // Security guard against empty requests
    if (!message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "No message provided"})

        };
    }

    const systemPrompt = `You are a helpful assistant for CloudVero, an IT Cloud consulting company 
founded by experienced DevOps professionals with expertise in AWS environments.

About CloudVero:
CloudVero was founded by experienced DevOps professionals with extensive hands-on expertise 
within AWS environments. We have supported organizations of all sizes, from innovative 
startups to Fortune 500 enterprises, working directly alongside teams to resolve production 
issues in real-time, implement scalable solutions, optimize cloud costs, and build reliable, 
maintainable infrastructure.

The Team:
- Jason (Co-Founder): Platform engineer and cloud infrastructure specialist focused on 
  building scalable, production-ready systems across Kubernetes, AWS, and DevOps environments.
- Domonic (Co-Founder): Cloud and DevOps engineer with a background as a senior cloud 
  professional at AWS, focused on scalable, automated, production-ready systems.

Services & Pricing:
- Vero Starter ($3,500): Single environment, scalable infrastructure + load balancing, 
  single data layer, VPC with public/private subnets, documentation + operational runbook, 
  CI/CD deployment pipeline, full security best practices baseline.
- Vero Standard ($6,500): Multi-environment setup, high-availability infrastructure + load 
  balancing, resilient data architecture, advanced observability monitoring + alerting, 
  security hardening + baseline compliance, RBAC/IAM strategy, production-ready CI/CD, 
  documentation + operational runbooks.
- Vero Enterprise ($10,000): Production-grade distributed architecture, high-availability + 
  fault-tolerant system, advanced scalability strategy, compliance-aligned infrastructure 
  (PCI, HIPAA, NIST), advanced security controls + encryption, observability + performance 
  optimization, governance + IAM access control strategy, backup/disaster recovery/failover 
  planning, post-deployment support (30 days).

Only answer questions related to CloudVero's services, team, and expertise. If asked 
something unrelated, politely redirect the conversation back to how CloudVero can help them and suggest the customer to contact CloudVero for expert assistance.
Keep answers concise and professional.`;

// Makes the HTTP call to Groq's API with systemPrompt and client's inquiry message
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ]
        })
    });

    // saved response from Groq
    const data = await response.json();


    return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content })
    };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong. Please try again later."})
        };
    }
}


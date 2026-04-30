---
title: "Kubernetes Security – Network Encryption between k8s Deployments and Ingress"
description: "Kubernetes Security – Network Encryption between k8s Deployments and Ingress"
pubDate: 2025-01-28
author: "Elliot Wong"
categories:
  - "engineering"
displayCategory: "Opensource"
image: "/images/blogs/98f61854df_67994411273bada74a6294a3_nazarizal-mohammad-ANAGcyPUVwk-unsplash-scaled.webp"
draft: false
webflowId: "679944a1d01fe4ac5d506f92"
---

![](/images/blogs/ff238372dc_6799441af9deac5f8d13772d_nazarizal-mohammad-ANAGcyPUVwk-unsplash-1160x928.webp)

**By Calvin**

TL; DR: With a simple example here, we demonstrate how to secure connections between your Kubernetes (k8s) deployments and ingress by enabling TLS and HTTPS. This can be a critical part in your DevSecOps workflow or a business requirement your development team must accomplish.

## Kubernetes Tutorial on Securing Connections

This a quick how-to guide on hardening a k8s application by enforcing secure communication between an Ingress controller and other k8s services. This is important especially if your business requirements, like in financial services or enterprise environments, compel you to enforce strict security measures such as encrypting all traffic in transit.

**Some caveats:** Managing a Kubernetes cluster itself is complex enough, and securing it can be convoluted. This will add another layer of complexity, so consider what your actual requirements are and conduct risk assessments. Not all projects require this level of security.

![\_\_wf\_reserved\_inherit](/images/blogs/b6e570f35a_679944a0d01fe4ac5d506f63_6799445b8e20e6a672bda43a_SCR-20250128-sdvk.png)

_A simple visualization of traffic between Ingress and back end_ services

## What’s not covered in this Kubernetes Security how-to

This guide only walks you through strengthening the connection between an Ingress and a k8s service. Say you have collection of microservices, you may also want to secure the connection between every one of them as well. Below are a few suggestions, weigh them accordingly.

#### Route all traffic with Ingress

Calls from a backend app to another must be routed through the Ingress. Connection is secured as we have already implemented TLS between the Ingress and the service(s) pointing to target backend app(s).

This approach does have one downside though, where communication points of all backend apps are exposed. IP whitelisting and using internal headers are some measures to protect them exposed endpoints.

#### Encrypted connection for each app by implementing TLS

With this one you will have to implement TLS and manage the corresponding certificate for each backend app. There can be a lot of chores just to generate the certificates, though this one completely avoids the exposed port issue.

#### Integrate service mesh

You can install a service mesh like [Linkerd](https://linkerd.io/2/features/automatic-mtls/) or [istio](https://istio.io/). What’s a service mesh? Basically it takes your yaml files and does some rewriting based on your instructions (e.g. some istio commands). With these amended config files, your k8s cluster will be deployed with some extra proxy services that intercept all communication between microservices and have security measures applied.

## Prerequisites and assumptions

*   You are familiar with concepts of containers, Docker.
*   Basic understandings on Kubernetes and how it achieves container orchestration are also required.
*   You have the fundamentals like “https vs http” or “TLS vs SSL” and know how to generate a self-signed [certificate](https://kubernetes.io/docs/concepts/cluster-administration/certificates/).

![Kubernetes Security via Application-level Network Encrpytion](/images/blogs/6c6f1c6cd1_6799441a1d0a449b567d9fec_photo-1550751827-4bd374c3f58b.webp)

PHOTO BY [Adi Goldstein](https://unsplash.com/@adigold1) ON [UNSPLASH](https://unsplash.com/)

## Components in our example

The example is made of these Kubernetes components:

1.  An Ingress where SSL termination for the public-facing domain, such as `secure-demo.some-cluster.com` is set.
2.  A k8s Service, routing to our backend.
3.  A k8s Deployment a.k.a our backend, a nginx web server serving HTTPS.

### Sample Kubernetes Configuration Files

Here’s a configuration file named `backend.yaml`, covering our entire backend (nginx server, a config map and a service). By providing the certs, we are done with the TLS Security Settings.

‍

apiVersion: v1  
kind: ConfigMap  
metadata:  
 labels:  
   app: demo-app  
 name: nginx-conf  
data:  
 site.conf: |  
   server {  
     listen 443 ssl;  
     server\_name demo-app;  
     ssl\_certificate /run/secrets/nginx-cert/tls.crt;  
     ssl\_certificate\_key /run/secrets/nginx-cert/tls.key;  
     location / {  
       root   /usr/share/nginx/html;  
       index  index.html index.htm;  
       try\_files $uri $uri/ /index.html;  
     }  
   }  
\---  
apiVersion: v1  
kind: Service  
metadata:  
 labels:  
   app: demo-app  
 name: demo-app  
spec:  
 ports:  
 - port: 443  
   protocol: TCP  
   targetPort: 443  
 selector:  
   app: demo-app  
 sessionAffinity: None  
 type: ClusterIP  
\---  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
 labels:  
   app: demo-app  
 name: demo-app  
spec:  
 replicas: 1  
 selector:  
   matchLabels:  
     app: demo-app  
 template:  
   metadata:  
     labels:  
       app: demo-app  
   spec:  
     restartPolicy: Always  
     volumes:  
     - name: nginx-conf  
       configMap:  
         name: nginx-conf  
     - name: demo-app-tls  
       secret:  
         secretName: demo-app-tls  
     containers:  
     - name: demo-app  
       image: nginx:1.19.2-alpine  
       imagePullPolicy: IfNotPresent  
       resources:  
         requests:  
           cpu: "8m"  
           memory: "16Mi"  
         limits:  
           cpu: "16m"  
           memory: "64Mi"  
       ports:  
       - containerPort: 443  
       volumeMounts:  
       - name: nginx-conf  
         mountPath: "/etc/nginx/conf.d"  
         readOnly: true  
       - name: demo-app-tls  
         mountPath: "/run/secrets/nginx-cert"  
         readOnly: true

‍

‍

And now comes the TLS network encryption part, where an Ingress config `ingress.yaml` is applied:

‍

apiVersion: networking.k8s.io/v1beta1  
kind: Ingress  
metadata:  
 name: demo-app  
 annotations:  
   ingress.kubernetes.io/proxy-body-size: 4m  
   kubernetes.io/tls-acme: "true"  
   kubernetes.io/ingress.class: "nginx"  
   nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"  
   nginx.ingress.kubernetes.io/proxy-ssl-secret: "NAMESPACE/demo-app-tls"  
   nginx.ingress.kubernetes.io/proxy-ssl-verify: "true"  
spec:  
 rules:  
   - host: YOUR-NAME.EXAMPLE-CLUSTER.com  
     http:  
       paths:  
         - path: /  
           backend:  
             serviceName: demo-app  
             servicePort: 443  
 tls:  
   - hosts:  
       - YOUR-NAME.EXAMPLE-CLUSTER.com  
     secretName: YOUR-NAME.EXAMPLE-CLUSTER.com

‍

‍

**Important Note:** If your deployment is not within the same namespace of the Ingress controller (which is the usual case), you need to specify the namespace for `proxy-ssl-secret`, i.e. `NAMESPACE/demo-app-tls`.

### Network encryption with m**ultiple back ends**

Microservices mean having many backend apps, but there is only one `proxy-ssl-secret` configuration per Ingress. To serve multiple apps from the same Ingress you may configure the Ingress to treat all services with the same name, as shown in the example below:

nginx.ingress.kubernetes.io/proxy-ssl-name: demo-app

What’s done under the hood is that the proxy name got overridden as `demo-app` for all services, so that they are served with the same certificate. This will slightly weaken the security, again weigh different options and decide what level of security you are looking to achieve. To go for a higher level of communication security, perhaps you’d like to create several Ingresses instead. Don’t hesitate and let me know if you have other ideas, it’s always nice interacting my fellow developers!

You can also apply a wild card like `*.svc.cluster.local` to match services, but by doing this technically all services are trusted which is just not very elegant.

### Create the demo server

**Below is a snippet for creating a self-signed certificate.** Note that this is just a simple example and you should not copy this impetuously for production:

‍

\# root CA  
openssl genrsa -out rootCA.key 4096  
openssl req -x509 -nodes -new -key rootCA.key -sha256 -days 1024 -out rootCA.crt  
\# generate cert for demo-app  
openssl genrsa -out demo-app.key 4096  
openssl req -new -sha256 -key demo-app.key -out demo-app.csr \\  
 -subj "/C=HK/ST=HK/L=HongKong/O=Example/OU=Org/CN=demo-app"  
openssl x509 -req -in demo-app.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial \\  
 -out demo-app.crt -days 1024 -sha256

‍

‍

**Then you can submit your secrets to k8s:**

kubectl -n NAMESPACE create secret generic demo-app-tls \\  --from-file=tls.crt=demo-app.crt \\  --from-file=tls.key=demo-app.key \\  --from-file=ca.crt=rootCA.crt

**Here the actual deployment and ingress are applied:**

kubectl -n NAMESPACE apply -f backend.yamlkubectl -n NAMESPACE apply -f ingress.yaml

Wait for the deployment to take effect, then the server will be ready on `https://YOUR-NAME.EXAMPLE-CLUSTER.com`!

### Clean up the namespace

kubectl -n NAMESPACE delete -f ingress.yamlkubectl -n NAMESPACE delete -f backend.yamlkubectl -n NAMESPACE delete secret demo-app-tls YOUR-NAME.EXAMPLE-CLUSTER.com

To learn more about working with the Ingress controller, check out these references on Kubernetes’ user guide:

*   [https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#backend-protocol](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#backend-protocol)
*   [https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#backend-certificate-authentication](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#backend-certificate-authentication)

‍

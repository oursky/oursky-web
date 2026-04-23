---
title: "How to set up an internal team forum in half a day using Discourse"
description: "How to set up an internal team forum in half a day using Discourse"
pubDate: 2025-01-28
author: "Ben Cheng"
category: "development"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679941aae30d0858a819cd21_Screen-Shot-2017-10-09-at-7.37.06-PM.png"
draft: false
webflowId: "6799428ee30d0858a81ae890"
---

![discourse forum deployed on kubernetes k8s](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/679941be5d936e4b69f9d858_Screen-Shot-2017-10-09-at-7.37.06-PM.png)

Oursky’s Discourse platform — deployed in our own Kubernetes (K8s) cloud.

> **TL;DR: I’ve deployed** [**Discourse**](https://www.discourse.org/) **on** [**Kubernetes (K8s)**](https://kubernetes.io/) **for** [**my company**](http://oursky.com/)**’s internal discussion platform. Because I couldn’t find a simple tutorial, I documented my steps to help other developers do it too.**

### Why would I want to deploy Discourse on Kubernetes?

1.  Our company already has a Kubernetes cluster for random tools and staging deployment, so it is cheaper to deploy on the existing cluster for an internal Discourse usage.
2.  As a founder, I don’t get many chances to code anymore. I wanted to learn how to use Kubernetes because my team has been using it a lot lately.

### A quick overview of this tutorial

The tutorial and the sample config below **shows how to deploy a single Discourse web-server**. This server needs to connect to a **PostgreSQL** and **Redis server**. We are using **Google Cloud Registry** and [gcePersistentDisk](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for storage.

So let’s begin:

### Create Discourse app Docker image

We will “misuse” the launcher provided by `discourse_docker` to create the docker image for the Discourse web server. And by “misuse” I mean that we have over-used the launcher script to create docker images for production use.

1.Clone from [https://github.com/discourse/discourse\_docker](https://github.com/discourse/discourse_docker) to your local environment.

2.Setup a temporary [Redis server](https://redis.io/topics/quickstart) and [PostgresSQL database](https://www.postgresql.org/download/) in the local environment.

3.Create a `containers/web_only.yml` (as shown below)

*   The env var is not relevant to K8s. It’s just for building the local image, so let’s fill in something that works for your local environment.
*   Determine the plugins you want to install with your Discourse setting here.

4.**Tip**: The local Redis instances might be in protected-mode, and won’t allow a Docker guest to host the connection. For this case, you should start your Redis server with the protected-mode turned off: `redis-server --protected-mode no`

5.Create the Docker images and upload the images to your K8s Docker registry. In this case, we are using Google Cloud Registry:

*   Create Docker image with Discourse’s launcher: `./launcher bootstrap web_only`
*   Verify that the image is created: `docker images`. You should see the Discourse image in the list if successful.
*   Upload the image to the registry with this command:

docker tag local\_discourse/web\_only gcr.io/\*\*my-cluster\*\*/discourse:latestgcloud docker — push gcr.io/\*\*my-cluster\*\*/discourse:latest

[view raw](https://gist.github.com/ourskycode/8af5ac2645e8eb367f7b590018415359/raw/876f63b4e510a2bba4132e5721006936ab0cad62/gistfile1.txt)[  
gistfile1.txt  
](https://gist.github.com/ourskycode/8af5ac2645e8eb367f7b590018415359#file-gistfile1-txt)hosted with ❤ by [GitHub](https://github.com/)

Sample config in `web_only.yml` :

‍

templates:  
 – "templates/web.template.yml"  
 – "templates/web.ratelimited.template.yml"  
env:  
 LANG: en\_US.UTF-8  
 UNICORN\_WORKERS: 2  
 DISCOURSE\_DB\_USERNAME: chpapa  
 DISCOURSE\_DB\_PASSWORD: ''  
 DISCOURSE\_DB\_HOST: docker.for.mac.localhost  
 DISCOURSE\_DB\_NAME: chpapa  
 DISCOURSE\_DEVELOPER\_EMAILS: 'bencheng@oursky.com'  
 DISCOURSE\_HOSTNAME: 'localhost'  
 DISCOURSE\_REDIS\_HOST: docker.for.mac.localhost  
hooks:  
 after\_code:  
   – exec:  
       cd: $home/plugins  
       cmd:  
         – mkdir -p plugins  
         – git clone https://github.com/discourse/docker\_manager.git  
         – git clone https://github.com/discourse/discourse-solved.git  
         – git clone https://github.com/discourse/discourse-voting.git  
         – git clone https://github.com/discourse/discourse-slack-official.git  
         – git clone https://github.com/discourse/discourse-assign.git  
run:  
 – exec:  
     cd: /var/www/discourse  
     cmd:  
       – sed -i 's/GlobalSetting.serve\_static\_assets/true/' config/environments/production.rb  
       – bash -c "touch -a /shared/log/rails/{sidekiq,puma.err,puma}.log"  
       – bash -c "ln -s /shared/log/rails/{sidekiq,puma.err,puma}.log log/"  
       – sed -i 's/default \\$scheme;/default https;/' /etc/nginx/conf.d/discourse.conf

‍

[view raw](https://gist.github.com/ourskycode/6518b302daa3d50bbd0b457076983e0c/raw/3f5bc994abe09a0c2f9fffe42169bde383958d19/web_only.yml)[  
web\_only.yml  
](https://gist.github.com/ourskycode/6518b302daa3d50bbd0b457076983e0c#file-web_only-yml)hosted with ❤ by [GitHub](https://github.com/)

### Now we’re ready to deploy to K8s

**1\. Prepare a persistent volume**

We will need a persistent volume as the database to store the user info and the discussion items. We are using [GCEPersistentDisk](https://kubernetes.io/docs/concepts/storage/volumes/#gcepersistentdisk) for the persistent disk on the K8s cluster. Now, let’s create two 10GB disks for the app and database respectively. You may consider your Discourse usage to adjust the disk size configuration.

gcloud compute disks create –size=\*\*10GB\*\* –type=\*\*pd-ssd\*\* –zone=\*\*us-east1-b\*\* \*\*discourse\*\*  
gcloud compute disks create –size=\*\*10GB\*\* –type=\*\*pd-ssd\*\* –zone=\*\*us-east1-b\*\* \*\*discourse-pgsql\*\*  

‍

[view raw](https://gist.github.com/ourskycode/f9783927b0a7e496852cb938731ccde2/raw/362b874c3f512d67927634664a79173ae55d43f6/gcloud_disksettings.sh)[  
gcloud\_disksettings.sh  
](https://gist.github.com/ourskycode/f9783927b0a7e496852cb938731ccde2#file-gcloud_disksettings-sh)hosted with ❤ by [GitHub](https://github.com/)

**2\. Deploy to Kubernetes**

Next, we will configure the deployment settings of the K8s cloud. Customize the sample K8s file. Here are some variables you probably want to tweak:

`volumes.yaml`

*   For both persistent volumes:
    *   metadata.name
    *   spec.capacity.storage
    *   spec.gcePersistentDisk.pdName (for the persistent disk name above)
    *   spec.claimRef.namespace (for the namespace you’re using in K8s)
*   The sample file here assumes you are using `gcePersistentDisk`. volumes.yaml needs to change heavily depending on what type of persistent disk you plan to use.

`redis.yaml`

*   Redis Deployment:
    *   spec.template.spec.containers.resources.\* (CPU and Memory resources for cache server)

`pgsql.yaml`

*   PersistentVolumeClaim (`pgsql-pv-claim`):
    *   `spec.resources.requests.storage` (storage of DB server)

`discourse.yaml`

*   PersistentVolumeClaim (`discourse-pv-claim`)
    *   spec.resources.requests.storage (storage of web-server disk for logs and backups)
*   Deployment (`web-server`)  
    –`spec.template.spec.containers.image` (Set the URL to point to your Docker image)  
    –`spec.template.spec.containers.env`

> **`DISCOURSE_DEVELOPER_EMAILS   DISCOURSE_HOSTNAME   DISCOURSE_SMTP_ADDRESS   DISCOURSE_SMTP_PORT`**

*   spec.template.spec.containers.resources.\* (CPU and Memory resources for your web-server)

`ingress.yaml`

*   `spec.rules.host`
*   `spec.tls.hosts`

**Recommended:** From there, you might want to create your own namespace for the deployment. Also assume you have set the right context to run the `kubectl` command in the namespace. (For details, read [Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/namespaces-walkthrough/)). Otherwise, you should rename most of the names in the config files above to unique names and add some labels.

Apply secrets. `dbUsername` and `dbPassword` can be anything you want. Please set the right `smtpUsername` and `smtpPassword` for the mail delivery services you use.

Another note on HTTPS for Ingress: you should read [this document](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) and the Ingress controllers specific to your cluster and update `ingress.yaml`accordingly.

apiVersion: v1  
kind: Secret  
metadata:  
 name: secret  
type: Opaque  
data:  
 dbUsername:  
 dbPassword:  
 smtpUsername:  
 smtpPassword:

‍

[view raw](https://gist.github.com/ourskycode/d887dd3de429ac25e1fbfee495772541/raw/cf77575a9f8cd15a67fe47381faf788dcc7edde0/secret.yaml)[  
secret.yaml  
](https://gist.github.com/ourskycode/d887dd3de429ac25e1fbfee495772541#file-secret-yaml)hosted with ❤ by [GitHub](https://github.com/)

Apply all config files:

kubectl apply -f secret.yamlkubectl apply -f volumes.yamlkubectl apply -f redis.yamlkubectl apply -f pgsql.yaml

[view raw](https://gist.github.com/ourskycode/07d4f9639e7c6e7afd409005112b0dbc/raw/64031406651ed13ec083932335e53d8fa259611a/apply_configs.sh)[  
apply\_configs.sh  
](https://gist.github.com/ourskycode/07d4f9639e7c6e7afd409005112b0dbc#file-apply_configs-sh)hosted with ❤ by [GitHub](https://github.com/)

Before starting the app, run the following on PostgreSQL instance to initialize the database properly. You can find your pod name by running `kubectl get pods`.

kubectl exec \*\*pgsql\*\* — su postgres -c 'psql template1 -c "create extension if not exists hstore;"'  
kubectl exec \*\*pgsql\*\* — su postgres -c 'psql template1 -c "create extension if not exists pg\_trgm;"'  
kubectl exec \*\*pgsql\*\* — su postgres -c 'psql \*\*discourse\*\* -c "create extension if not exists hstore;"'  
kubectl exec \*\*pgsql\*\* — su postgres -c 'psql \*\*discourse\*\* -c "create extension if not exists pg\_trgm;"'

‍

[view raw](https://gist.github.com/ourskycode/06870f701fd0cdfc169c40d16c59cc89/raw/2c3d4cd85d90aa741c150aba1df089abf5d0b7ff/init_pgsql.sh)[  
init\_pgsql.sh  
](https://gist.github.com/ourskycode/06870f701fd0cdfc169c40d16c59cc89#file-init_pgsql-sh)hosted with ❤ by [GitHub](https://github.com/)

Create Discourse deployment and Ingress with these commands:

kubectl apply -f discourse.yamlkubectl apply -f ingress.yaml

[view raw](https://gist.github.com/ourskycode/ba5757745ae6c1aabaff224471c4eb1c/raw/34ab562c1f9faa1c7c6af1568fd65a74923e2ecb/create_deployment.sh)[  
create\_deployment.sh  
](https://gist.github.com/ourskycode/ba5757745ae6c1aabaff224471c4eb1c#file-create_deployment-sh)hosted with ❤ by [GitHub](https://github.com/)

From here, your Discourse instance should be up and running. Below are some useful commands in case things don’t work and require debugging:

\# Check logs of k8s pod  
kubectl logs –since=1h –tail=50 -lapp=web-server

\# Open an interactive terminal into the web-server / pgsql server:  
kubectl exec -it \*\*web-server\*\* — /bin/bash  
kubectl exec -it \*\*pg-sql\*\* — /bin/bash

\# You might want to do the following:  
\# \* Delete / create the pgsql database  
\# \* Check logs under /shared/log/rails  
\# \* Start stop unicorn by sv stop unicorn  
\# \* Run bundle exec rake db:migrate / admin:create in case something went wrong under /var/www/discourse  
\# \* You can also check the logs with an admin account at /admin/logs of your deployment

‍

[view raw](https://gist.github.com/ourskycode/83642f9acc23f058d2879067aed23db6/raw/3c1e86b1bdf583a6472d689e392aded5a51ecebb/k8s_debugg_message.sh)[  
k8s\_debugg\_message.sh  
](https://gist.github.com/ourskycode/83642f9acc23f058d2879067aed23db6#file-k8s_debugg_message-sh)hosted with ❤ by [GitHub](https://github.com/)

### Setup S3 backup and file upload

Discourse can use AWS S3 for backup and file upload. Here are the steps to enable it:

1.  Create two S3 buckets: one for backup and one for file upload. Set them as private.
2.  Create an IAM user with API access only and attach the AWS inline policy below:

https://gist.github.com/ourskycode/12a1e1f77883fd590c615ed9be73676f#file-aws-s3-json

1.  Fill in the Access Key and Key ID in **Discourse Setting**.

Then Discourse can upload files to the S3 bucket you’ve specified, so you can attach image and file attachments in each post.

### That’s it!

I hope this piece is helpful for you to set up your own Discourse platform. It’s also a practical exercise for me to try deploying an app on K8s.

### Potential improvement and scaling up:

*   It’s possible to run multiple replicas for Discourse web-server for scaling up. It should work, but I haven’t tried yet.
*   We could also deploy Master-Slave PostgreSQL for scaling up. We’re using [Bitnami](https://bitnami.com/)’s PostgreSQL docker image and you can read the relevant instructions [here](https://github.com/bitnami/bitnami-docker-postgresql).

‍

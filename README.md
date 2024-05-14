<div align="center">
  <a href="https://koyeb.com">
    <img src="https://www.koyeb.com/static/images/icons/koyeb.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Koyeb Serverless Platform</h3>
  <p align="center">
    Deploy a LLamaIndex and MongoDB job search application on Koyeb
    <br />
    <a href="https://koyeb.com">Learn more about Koyeb</a>
    ·
    <a href="https://koyeb.com/docs">Explore the documentation</a>
    ·
    <a href="https://koyeb.com/tutorials">Discover our tutorials</a>
  </p>
</div>


## About Koyeb and the LlamaIndex and MongoDB job search example application

Koyeb is a developer-friendly serverless platform to deploy apps globally. No-ops, servers, or infrastructure management.  This repository contains a job search application you can deploy on the Koyeb serverless platform for testing.

This example application is designed to show how to build and deploy a job search application using LlamaIndex and MongoDB.  The application is built using Next.js and allows users to query a list of submitted job posts.  The application is backed by a MongoDB database using vector indexing and queries the OpenAI API to produce markdown formatted summaries of relevant jobs.

## Getting Started

Follow the steps below to deploy and run the LlamaIndex and MongoDB job search application on your Koyeb account.

### Requirements

* A [Koyeb account](https://app.koyeb.com/auth/signup) to build, deploy, and run this application.
* An [OpenAI account](https://platform.openai.com) to summarize and format responses to user queries.
* A [MongoDB account](https://mongodb.com) to host our database and create vector indexes that can help identify relevant posts to user queries.

### Provision a MongoDB database

Before deploying, you will need to create a MongoDB database and obtain a MongoDB connection string.

[Log in to MongoDB](https://account.mongodb.com/account/login) and create a new database cluster.  Once it's provisioned, check the **Network Access** tab to ensure that all IPs are allowed to connect (`0.0.0.0/0`) so that Koyeb can connect to the database.

Click the **Connect** button associated with your database and select **Drivers**.  Select Node.js and copy the connection string provided.  If this is not your first time seeing this screen, the password will be replaced by `<password>` in the string. Replace that with your actual database password when copying.  You can visit the **Database Access** page if you forget the current password.

### Deploy using the Koyeb button

Once you have a MongoDB database deployed, the fastest way to deploy the job search application is to click the [Deploy to Koyeb](https://www.koyeb.com/docs/build-and-deploy/deploy-to-koyeb-button) button below:

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=llamaindex-job-search&type=git&repository=koyeb%2Fexample-llamaindex-mongodb-job-search&branch=main&builder=buildpack&env%5BOPENAI_API_KEY%5D=CHANGE_ME&env%5BMONGODB_URI%5D=CHANGE_ME&env%5BMONGODB_DATABASE%5D=jobs_db&env%5BMONGODB_VECTORS%5D=jobs_vectors&env%5BMONGODB_VECTOR_INDEX%5D=jobs_vectors_index&ports=8000%3Bhttp%3B%2F)

Open the **Environment variables** section and set the appropriate values for your application:

- `MONGODB_URI`: This is your MongoDB database's connection string you copied earlier.
- `OPENAI_API`: This is your OpenAI API key.
- `MONGODB_DATABASE`: The database where your jobs will be stored.  Leave this as `jobs_db`.
- `MONGODB_VECTORS`: The vectors for your jobs.  Leave this as `jobs_vectors`.
- `MONGODB_VECTORS_INDEX`: The vector index for your jobs.  Leave this as `jobs_vectors_index`.

Once deployed, before using the application, you will need to [seed at least one initial job](https://koyeb.com/tutorials/using-llamaindex-and-mongodb-to-build-a-job-search-assistant#seed-the-job-database), and [set up MongoDB Atlas vector search](https://koyeb.com/tutorials/using-llamaindex-and-mongodb-to-build-a-job-search-assistant#set-up-mongo-db-atlas-vector-search).

_To modify this application example, you will need to fork this repository. Checkout the [fork and deploy](#fork-and-deploy-to-koyeb) instructions._

## Fork and deploy to Koyeb

If you want to customize and enhance this application, you need to fork this repository.

If you used the **Deploy to Koyeb** button, you can simply link your service to your forked repository to be able to push changes.  Alternatively, you can manually create the application as described below.

On the [Koyeb Control Panel](//app.koyeb.com/apps), on the **Overview** tab, click the **Create Web Service** button to begin.

To deploy the application, use the following procedure:

1. Select **GitHub** as the deployment method.
2. Select your project repository.
3. In the **Environment variables** section, click **Bulk edit** to enter multiple environment variables at once. In the text box that appears, paste the following:

   ```
    OPENAI_API_KEY=
    MONGODB_URI=
    MONGODB_DATABASE="jobs_db"
    MONGODB_VECTORS="jobs_vectors"
    MONGODB_VECTOR_INDEX="jobs_vectors_index"
   ```

   Set the variable values to reference your own information as follows:

    - `MONGODB_URI`: This is your MongoDB database's connection string you copied earlier.
    - `OPENAI_API`: This is your OpenAI API key.
    - `MONGODB_DATABASE`: The database where your jobs will be stored.  Leave this as `jobs_db`.
    - `MONGODB_VECTORS`: The vectors for your jobs.  Leave this as `jobs_vectors`.
    - `MONGODB_VECTORS_INDEX`: The vector index for your jobs.  Leave this as `jobs_vectors_index`.

4. Click **Deploy**.

## Contributing

If you have any questions, ideas or suggestions regarding this application sample, feel free to open an [issue](https://github.com/koyeb/example-llamaindex-mongodb-job-search/issues) or fork this repository and open a [pull request](https://github.com/koyeb/example-llamaindex-mongodb-job-search/pulls).

## Contact

[Koyeb](https://www.koyeb.com) - [@gokoyeb](https://twitter.com/gokoyeb) - [Slack](http://slack.koyeb.com/)

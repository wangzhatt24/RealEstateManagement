Đọc tiếng việt(Vietnamese version) [tại đây](./README_VN.md)!

#RealEstateManagement

Official code repository of the Real Estate Information Management project on the Amazon Web Services platform
<hr />

1. Regulations and procedures on using git and github for code repositories

In general, we will not directly code or push commits to the master branch. Instead, we will create a develop branch and from this branch develop features (create feature branches) or fix bugs,... then merge. back to the develop branch, from the develop branch we will move to the release branch if we need to release it, if the release branch has an error then we will put the code back into develop to fix it, if it's ok then from release push the code to production, if production has an error then create it. hotfix branch, hotfix dumps code to develop and repeats.

The issue section can be used to assign tasks and ask questions

For example: A assigns a job to B, then write the content and assign it to B (using assignees) and use the label as feature

We have the following example: Wangzhatt24 assigned himself a task to create a card.model.js
When assigning tasks with issues is completed, the issues title in github will look like this:

 wangzhatt24 - create-card.model.js file #1

can be understood as Who did it? Doing what? #1 is the reference number, keep an eye on this

We will create a branch in git to resolve this issue:

 git checkout -b feature/1-add-card-model.js develop

This means that from the develop branch checkout out a branch to resolve the requested feature

Note that #1 I will create similarly in git is

 label/#request-content-reference number

After that we will do the assigned work, then git status and git add to track as usual

But the commit part should be like this:

 git commit -m "#1 - who does - what?"

You can see #1 refers to specific issues, this is important, check the issues section to have references and complete information about who worked and which issue.

Remember git push origin is the branch name to push to github

Then we go to github to create a pull request to merge the branch we are developing (fearture #1) into the develop branch, remember to write in the pull request there must be #1 to refer to it.

After creating a pull, the manager can assign code reviewers, assign labels,...

The person responsible for merging will merge and leave a comment

Now under local you will checkout through the develop branch and pull code from remote to git pull origin develop

Then we may want to release, we will create a release branch from the develop branch

 git checkout -b release-1.1.0 develop
 git tag "v1.1.0"
 git push --tags

Check on github there will be tags

Then git merge develop to merge the develop branch code

Then git push origin release-1.1.0 to push the code up

From release we will create a pull request to the master (or main) branch.

After combining the code, we can pull from the local master (or main):

 git pull origin master

Summary of what happened:

 - From the develop branch create fearture #1-create-card-model
 - Merge into develop
 - From develop create release
 - Pull code develop through release
 - From release pull to master

Now we will delete the release branch and fearture branch in local and remote

 remote: git push origin -d release-1.1.0
 local: git branch -d release-1.1.0
 remote: git push origin -d fearture/1-create-card-model.js
 local: git branch -d fearture/1-create-card-model.js

If there is an error in production, we will hot fix it by creating a hotfix branch and then moving it to the develop branch or fix it there and then pull the request to master.

 git checkout -b hotfix
 git add, git commit -m "#4 - fix some"
 git push origin hotfix
 Create a pull request to master
 Then checkout master and pull from remote
 Then delete the completed branches

2. Configuration

The first question is to configure which port the application runs on, what is the environment, if you configure additional database, aws s3,... how should you configure it?
NestJs recommends [how to configure](https://docs.nestjs.com/techniques/configuration)
However, it is too complicated and does not meet the above basic needs
For example: ![Difficult to configure simple port](./assets/images/main-dotenv-questioningioning.png)
![NestJs instructions for configuring mongodb](./assets/images/how-nestjs-config-mongodb.png)

So I decided to use the old and more accessible way:
[Read more](https://medium.com/@datails/nestjs-keep-it-simple-stupid-4101d8bdf59c)
I created a folder and file as follows: configs/configs.ts
Use dotenv to read a simple configuration file as follows:

![Simple configuration](./assets/images/how-i-configed-dotenv.png)

Then basic Swagger configuration

![Basic swagger](./assets/images/swagger-configs.png)

3. Document overview:

Since we are using swagger, the descriptions of input and output requirements are quite complete. I only write the usage parts that I think would be vague if they were missing.

How to run API:
**Must have env file (Contact backend to get sample file)**

Make sure the terminal is in the api directory

Then install dependencies using

 npm install

 Once we have installed the dependencies, run the following command:

 npm run start:debug

 Or:

 npm run start:dev

Then looking at the console screen will return the link to access trang API documentation (swagger)

Account Management

![Account Management](./assets/images/accmgt.png)

Authentication

![Authentication](./assets/images/authen.png)

With this api, we will use to log in first, fill in the account password and run. If it is correct, the system will return us an access_token, copy and paste this token into the lock icon, meaning we are logged in.

![User Management](./assets/images/user.png)

![Broker Management](./assets/images/broker.png)

![Post Management](./assets/images/post.png)

![Report Management](./assets/images/report.png)

![Notification Management](./assets/images/noti.png)
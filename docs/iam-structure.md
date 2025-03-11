# 🏗️ AWS IAM Structure for E-Commerce Project

## ✅ Overview
This document describes the AWS IAM setup for our **secure, industry-standard** e-commerce project.  
Following the **Principle of Least Privilege**, we use **IAM Groups, Roles, and OpenID Connect (OIDC)** for secure authentication.

---

## 🏢 **1. IAM Groups & Permissions**
IAM Groups ensure that users inherit permissions **without directly attaching policies**.

| **IAM Group**       | **Who Belongs Here?** | **Attached AWS Policies** |
|---------------------|----------------------|-----------------------|
| **Admins** 👑        | `AdminUser`         | ✅ `AdministratorAccess` |
| **Developers** 👨‍💻 | `DevUser1`, `DevUser2` | ✅ `AmazonEKSClusterPolicy`, `AmazonEC2ContainerRegistryPowerUser`, `AmazonS3ReadOnlyAccess`, `AmazonDynamoDBReadOnlyAccess`, `AWSLambdaReadOnlyAccess` |
| **DevOps** 🔄        | `DevOpsUser1`        | ✅ `AmazonEKSClusterPolicy`, `AmazonEKSServicePolicy`, `AmazonEKSWorkerNodePolicy`, `AmazonEC2ContainerRegistryFullAccess`, `AWSCloudFormationFullAccess`, `AmazonVPCFullAccess` |
| **DatabaseAdmins** 🛢️ | `DBAdmin1`           | ✅ `AmazonRDSFullAccess`, `AmazonDynamoDBFullAccess`, `AmazonElastiCacheFullAccess` |
| **Security** 🔒      | `SecurityUser1`      | ✅ `SecurityAudit`, `AWSCloudTrailReadOnlyAccess`, `AWSConfigRole`, `IAMReadOnlyAccess` |
| **ReadOnly** 👀      | `ReadOnlyUser1`      | ✅ `ReadOnlyAccess` |

✅ **IAM Users are assigned to groups instead of having direct policies.**

---

## 👤 **2. IAM Users & Group Membership**
IAM Users do not have direct permissions but inherit permissions from **IAM Groups**.

| **IAM User**     | **Assigned IAM Group** | **Permissions (Inherited from Group)** |
|-----------------|----------------------|--------------------------------|
| `AdminUser`     | `Admins` 👑 | ✅ Full AWS Control |
| `DevUser1`      | `Developers` 👨‍💻 | ✅ Limited EKS, ECR, DynamoDB, Lambda Access |
| `DevUser2`      | `Developers` 👨‍💻 | ✅ Limited EKS, ECR, DynamoDB, Lambda Access |
| `DevOpsUser1`   | `DevOps` 🔄 | ✅ Full EKS, ECR, CloudFormation, Networking |
| `DBAdmin1`      | `DatabaseAdmins` 🛢️ | ✅ Full RDS, DynamoDB, ElastiCache |
| `SecurityUser1` | `Security` 🔒 | ✅ IAM, CloudTrail, Security Monitoring |
| `ReadOnlyUser1` | `ReadOnly` 👀 | ✅ Read-Only AWS Access |

✅ **Developers do NOT have direct ECR push access but use GitHub OIDC for authentication.**

---

## 🔄 **3. IAM Roles (For Temporary Access & Automation)**
IAM Roles **provide temporary access** and are assumed dynamically when needed.

| **IAM Role**            | **Who Assumes It?** | **Permissions Assigned** |
|-------------------------|--------------------|-------------------------|
| **`GitHubActionsRole`** 🚀 | GitHub Actions (OIDC) | ✅ `AmazonEC2ContainerRegistryFullAccess`, `AmazonS3FullAccess`, `CloudFrontFullAccess` |
| **`EKSAdminRole`** 🎛️ | `DevOpsUser1` | ✅ `AmazonEKSClusterPolicy`, `AmazonEC2FullAccess` |
| **`EKSNodeRole`** 🚀 | **EKS Worker Nodes** | ✅ `AmazonEKSWorkerNodePolicy` |
| **`LambdaExecutionRole`** ⚡ | AWS Lambda | ✅ `AWSLambdaBasicExecutionRole` |
| **`LoggingRole`** 📊 | `SecurityUser1` | ✅ `CloudWatchLogsFullAccess`, `AWSCloudTrailFullAccess` |
| **`CloudFrontInvalidationRole`** ⚡ | `DevUser1` | ✅ `CloudFrontFullAccess` (For invalidating CDN cache) |

✅ **GitHub Actions uses `GitHubActionsRole` (OIDC) instead of static AWS credentials.**  
✅ **Developers do not need manual AWS authentication for CI/CD.**  

---

## 🔄 **4. How GitHub Actions Authenticates Securely**
🚀 We use **AWS OpenID Connect (OIDC) with GitHub Actions** to remove **AWS keys**.

### **🔹 Summary: How This Structure Validates `DevUser1`**
| **Step**                     | **How It’s Secured** |
|-----------------------------|----------------------|
| **1️⃣ DevUser1 pushes code to GitHub** | ✅ GitHub verifies `DevUser1` using SSH or PAT. |
| **2️⃣ GitHub Actions starts CI/CD** | ✅ GitHub verifies that the commit is from `DevUser1`. |
| **3️⃣ GitHub assumes IAM Role (OIDC)** | ✅ AWS validates GitHub's identity & repository. |
| **4️⃣ GitHub builds & pushes Docker image to ECR** | ✅ AWS only allows trusted GitHub repos. |
| **5️⃣ Deployment happens securely** | ✅ No AWS keys stored, no manual IAM role needed. |

### **✅ New Approach (OIDC - Secure & Automated)**
- **GitHub Actions assumes `GitHubActionsRole` dynamically via OIDC** ✅
- **No static AWS credentials needed** ✅
- **Automatically expires after use** ✅

---

## 🔥 **5. Final AWS IAM Security Best Practices**
- **No AWS access keys stored in GitHub** ✅  
- **Users inherit permissions from IAM Groups** ✅  
- **Roles provide temporary access when needed** ✅  
- **GitHub Actions uses OIDC for authentication** ✅  
- **CloudTrail logs monitor all AWS IAM actions** ✅  

🚀 **This setup is secure, scalable, and follows industry best-practices!**

---
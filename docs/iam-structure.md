## ✅ **📌 How IAM Works in This Project**
📌 IAM is structured using **groups, users, and roles** following **the least privilege principle**:
- **Users do NOT have policies directly attached** 🚫  
- **Users are assigned to IAM Groups** ✅  
- **Certain operations require assuming IAM Roles** ✅  

### **IAM Flow:**
1. **Users get basic permissions from IAM Groups** (Persistent Access).  
2. **Users assume IAM Roles when they need additional permissions** (Temporary Access).  
3. **CloudTrail & Security logs monitor all IAM actions.**  

✅ **This follows real-world AWS security best practices.**

---

## ✅ **📌 IAM Groups, Users, and Roles**
### **📌 1️⃣ IAM Groups & Their Policies**
| **IAM Group**       | **Who Belongs Here?** | **Attached Policies** |
|---------------------|----------------------|-----------------------|
| **Admins** 👑        | `AdminUser`         | ✅ `AdministratorAccess` |
| **Developers** 👨‍💻 | `DevUser1`, `DevUser2` | ✅ `AmazonEKSClusterPolicy`, `AmazonEC2ContainerRegistryPowerUser`, `AmazonS3ReadOnlyAccess`, `AmazonDynamoDBReadOnlyAccess`, `AWSLambdaReadOnlyAccess` |
| **DevOps** 🔄        | `DevOpsUser1`        | ✅ `AmazonEKSClusterPolicy`, `AmazonEKSServicePolicy`, `AmazonEKSWorkerNodePolicy`, `AmazonEC2ContainerRegistryFullAccess`, `AWSCloudFormationFullAccess`, `AmazonVPCFullAccess` |
| **DatabaseAdmins** 🛢️ | `DBAdmin1`           | ✅ `AmazonRDSFullAccess`, `AmazonDynamoDBFullAccess`, `AmazonElastiCacheFullAccess` |
| **Security** 🔒      | `SecurityUser1`      | ✅ `SecurityAudit`, `AWSCloudTrailReadOnlyAccess`, `AWSConfigRole`, `IAMReadOnlyAccess` |
| **ReadOnly** 👀      | `ReadOnlyUser1`      | ✅ `ReadOnlyAccess` |

✅ **IAM Groups control user permissions**.

---

### **📌 2️⃣ IAM Users & Their Assigned Groups**
| **IAM User**     | **Assigned IAM Group** | **Permissions (Through Group)** |
|-----------------|----------------------|--------------------------------|
| `AdminUser`     | `Admins` 👑 | ✅ Full AWS Control |
| `DevUser1`      | `Developers` 👨‍💻 | ✅ Limited EKS, ECR, DynamoDB, Lambda Access |
| `DevUser2`      | `Developers` 👨‍💻 | ✅ Limited EKS, ECR, DynamoDB, Lambda Access |
| `DevOpsUser1`   | `DevOps` 🔄 | ✅ Full EKS, ECR, CloudFormation, Networking |
| `DBAdmin1`      | `DatabaseAdmins` 🛢️ | ✅ Full RDS, DynamoDB, ElastiCache |
| `SecurityUser1` | `Security` 🔒 | ✅ IAM, CloudTrail, Security Monitoring |
| `ReadOnlyUser1` | `ReadOnly` 👀 | ✅ Read-Only AWS Access |

✅ **IAM Users do NOT have direct policies. They inherit permissions from IAM Groups.**

---

### **📌 3️⃣ IAM Roles (For Temporary Access)**
| **IAM Role**            | **Who Assumes It?** | **Permissions Assigned** |
|-------------------------|--------------------|-------------------------|
| **`EKSAdminRole`** 🎛️ | `DevOpsUser1` | ✅ `AmazonEKSClusterPolicy`, `AmazonEC2FullAccess` |
| **`EKSNodeRole`** 🚀 | **EKS Worker Nodes** | ✅ `AmazonEKSWorkerNodePolicy` |
| **`ECRPushRole`** 🐳 | `DevUser1`, `DevOpsUser1`, CI/CD | ✅ `AmazonEC2ContainerRegistryFullAccess` |
| **`LambdaExecutionRole`** ⚡ | AWS Lambda | ✅ `AWSLambdaBasicExecutionRole` |
| **`DatabaseAccessRole`** 🛢️ | `DBAdmin1`, Backend Microservices | ✅ `AmazonRDSFullAccess`, `AmazonDynamoDBFullAccess` |
| **`LoggingRole`** 📊 | `SecurityUser1` | ✅ `CloudWatchLogsFullAccess`, `AWSCloudTrailFullAccess` |
| **`S3DeployRole`** 🌐 | `DevUser1` | ✅ `AmazonS3FullAccess` (Upload Frontend to S3) |
| **`CloudFrontInvalidationRole`** ⚡ | `DevUser1` | ✅ `CloudFrontFullAccess` (Invalidate CDN Cache) |

✅ **IAM Roles allow temporary access for specific operations**.

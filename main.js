import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const projectName = "my-project";
const orgId = "my-org-id";
const billingAccountId = "my-billing-account-id";

const folderId = "my-folder-id";


const project = new gcp.organizations.Project(projectName, {
    orgId: orgId,
    billingAccount: billingAccountId,
    folderId: folderId,
});

const secureLandingZone = new gcp.landingzone.SecureLandingZone("secure-landing-zone", {
    project: project.projectId,
    folderId: folderId,
    orgId: orgId,
    billingAccountId: billingAccountId,
    region: "us-central1",
    zones: ["us-central1-a", "us-central1-b", "us-central1-c"],
    networkConfig: {
        network: "my-network",
        subnetwork: "my-subnetwork",
    },
});

export const secureLandingZoneName = secureLandingZone.name;

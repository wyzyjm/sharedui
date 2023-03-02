
const getDocumentFwlink = (linkId: string): string => {
    switch (process.env.AzureEnvironment) {
        //   case AzureEnvironment.AzureEnvironmentUSNat:
        //     return "https://go.eaglex.ic.gov/fwlink/?linkid=" + linkId;
        //   case AzureEnvironment.AzureEnvironmentUSSec:
        //     return "https://go.microsoft.scloud/fwlink/?linkid=" + linkId;
        default:
            return "https://go.microsoft.com/fwlink/?linkid=" + linkId;
    }
};


export const urlLinks = {
    learnMoreAboutAzurePortal: (): string => {
        switch (process.env.AzureEnvironment) {
            // case AzureEnvironment.AzureEnvironmentDogfood:
            //     return getDocumentFwlink("2162780");
            // case AzureEnvironment.AzureEnvironmentMooncake:
            //     return getDocumentFwlink("2162691");
            // case AzureEnvironment.AzureEnvironmentFairfax:
            //     return getDocumentFwlink("2162909");
            default:
                return getDocumentFwlink("2162781");
        }
    },
    learnMoreAboutCognitiveServicesSubscription: (): string => {
        switch (process.env.AzureEnvironment) {
            //   case AzureEnvironment.AzureEnvironmentDogfood:
            //     return getDocumentFwlink("2163214");
            //   case AzureEnvironment.AzureEnvironmentMooncake:
            //     return getDocumentFwlink("2163215");
            //   case AzureEnvironment.AzureEnvironmentFairfax:
            //     return getDocumentFwlink("2162938");
            default:
                return getDocumentFwlink("2163216");
        }
    },
}
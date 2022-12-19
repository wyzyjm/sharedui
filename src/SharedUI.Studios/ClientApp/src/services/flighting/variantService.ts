import { VariantAssignmentRequest, VariantAssignmentServiceClient, VariantAssignmentClientSettings } from "@azure/exp-variant-assignment";

export interface TasResponse {
    Id: string;
    Parameters: Parameters;
}

export interface Parameters {
    [key: string]: string | boolean | Number;
}

/**
 * Sample usage: 
 * const varsvc = new VariantService();
 * var params = new Map<string, string[]>();
 * params.set('userId', ["12345"]);
 * varsvc.initialize(params);
 * console.log(varsvc.getAllFeatures());
 */
export class VariantService {
    private endpoint = 'https://default.exp-tas.com/exptas77/ccee9b5e-a60e-417c-a410-b922bbb8e1d8-studioexp/api/v1/tas';
    private expResponse: TasResponse[] = [];

    constructor() {
    }

    /**
     * @param parameters the parameters to send to the variant service. This includes a map of assignment
     * units, like { 'userId': ['abcd'], 'geo': ['westus', 'eastus'] }
     */
    public async initialize(parameters: Map<string, string[]>, namespace: string = "default") {

        let settings: VariantAssignmentClientSettings = { endpoint: this.endpoint, enableCaching: true, responseCacheTime: 60 };

        let request: VariantAssignmentRequest =
        {
            parameters: parameters
        };

        let client = new VariantAssignmentServiceClient(settings);
        let response = await client.getVariantAssignments(request);

        this.expResponse = response.featureVariables as TasResponse[];
    }

    /**
     * Get the list of features
     * @param namespace
     * @returns the list of features returned for your passed parameters
     */
    public async getAllFeatures(namespace: string = "default"): Promise<Parameters> {
        //default is the namespace
        var defaultConfig = this.expResponse.find(c => c.Id.toLowerCase() === namespace.toLowerCase());
        return defaultConfig?.Parameters;
    }
}

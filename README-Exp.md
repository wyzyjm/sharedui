
# Experimentation on the Cognitive Services

The experimentation support in the Shared components is based on [exp platform](https://eng.ms/docs/products/experimentation-platform/docs/onboarding/onboardingsteps). If you want to learn the details of the platform, the above url contains the required documentation.

NOTE: Currently, we only support `assignment` service. This means based on features, you can get a relevant assignment. For example, you can setup an experiment where 50% of users would be assigned a flight "A", while the other 50% of users would be assigned a flight "B". In your code you can determine the behavior based on the flight received. 
The contract looks like: 
Input: {user-id}   (one/multiple features as setup for your experiment)
Output: {flightA,flightB}   (one/multiple flights as setup for your experiment)

**We dont support data logging ** - this means the consumer needs to log the flights received, the intended behavior (for example, clicks) and do the analysis based off of the logged data (example, did users of flightA perform better than flightB).

## STEP 1: Build your hypothesis: 
Document what are you trying to prove using experimentation. For example, if I change the bgcolor of a button to blue, the #clicks on the button would increase by 50%.  

## STEP 2: Setup your features (optional):
We currently support {user-id} as the feature to do the assignment. However, if you need to add more features, we should be able to do it pretty quickly.

## STEP 3: Implement your A/B code logic: 
We expose a `VariantService` component as a shared component which you should be able to use to get the assignments. A simple implementation is shown below:

 ```javascript
const varsvc = new VariantService();
 var params = new Map<string, string[]>();
 params.set('userId', ["12345"]);
 varsvc.initialize(params);
 console.log(varsvc.getAllFeatures());  // prints all the flights applicable for the user 12345
```

Apart from the above, you need to log the appropriate data to be able to do your analysis later.

## STEP 4: Setup your experiment:
We can help you setup your experiment. The experiment is the place where you determine what % of traffic would get what flights and all the other customizations(if needed). 

## STEP 5: Once the experiment is over(typically after 14 days), analyze the data and verify your hypothesis. 



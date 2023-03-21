import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectResourceTab } from './SelectResourceTab'
import { ISelectResourceTabProps } from './SelectResourceTab'
import { Subscription, AzureSubscription, AzureRoleDefinitionType, TenantInformation, FetchStatus } from '../../../models'
import { ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
  title: "SelectResourceTab",
  component: SelectResourceTab,
} as ComponentMeta<typeof SelectResourceTab>;

const ResourceTemplate: ComponentStory<typeof SelectResourceTab> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <SelectResourceTab {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}
const subscriptions: Subscription[] = [
  {
    "type": 0,
    "azureId": "/subscriptions/a9216f37-b90e-4db2-b844-b171e5394fc1/resourceGroups/aoai-runner/providers/Microsoft.CognitiveServices/accounts/aoai-runner-usw2t-m-0-20230223T070031",
    "id": "559a437beebb45c694bbbb33821445c4",
    "name": "aoai-runner-usw2t-m-0-20230223T070031",
    "endpoint": "https://aoai-runner-usw2t-m-0-20230223t070031.openai.azure.com/",
    "disableLocalAuth": false,
    "azureSubscriptionId": "a9216f37-b90e-4db2-b844-b171e5394fc1",
    "azureSubscriptionName": "CS-Platform-Test-02",
    "locale": "westus2",
    "localeDisplayName": "westus2",
    "kind": "OpenAI",
    "sku": "S0",
    "key1": "key1",
    "key2": "key2",
    roleAssignmentsFetchStatus: FetchStatus.Succeeded,
    "provisioningState": "Creating",
    "capabilities": [
      { "name": "VirtualNetworks" },
      { "name": "CustomerManagedKey" },
      { "name": "MaxFineTuneCount", "value": "100" },
      { "name": "MaxRunningFineTuneCount", "value": "1" },
      { "name": "MaxUserFileCount", "value": "50" },
      { "name": "MaxTrainingFileSize", "value": "100000000" },
      { "name": "MaxUserFileImportDurationInHours", "value": "1" },
      { "name": "MaxFineTuneJobDurationInHours", "value": "120" }]
  },
  { "type": 0, "azureId": "/subscriptions/a9216f37-b90e-4db2-b844-b171e5394fc1/resourceGroups/aoai-runner/providers/Microsoft.CognitiveServices/accounts/aoai-runner-usw2t-s-0-20230223T064435", "id": "d776581cb9494be0b204d9b87e0e9063", "name": "aoai-runner-usw2t-s-0-20230223T064435", "endpoint": "https://aoai-runner-usw2t-s-0-20230223t064435.openai.azure.com/", "disableLocalAuth": false, "azureSubscriptionId": "a9216f37-b90e-4db2-b844-b171e5394fc1", "azureSubscriptionName": "CS-Platform-Test-02", "locale": "westus2", "localeDisplayName": "westus2", "kind": "OpenAI", "sku": "S0", "key1": "", "key2": "", "provisioningState": "Succeeded", "capabilities": [{ "name": "VirtualNetworks" }, { "name": "CustomerManagedKey" }, { "name": "MaxFineTuneCount", "value": "100" }, { "name": "MaxRunningFineTuneCount", "value": "1" }, { "name": "MaxUserFileCount", "value": "50" }, { "name": "MaxTrainingFileSize", "value": "100000000" }, { "name": "MaxUserFileImportDurationInHours", "value": "1" }, { "name": "MaxFineTuneJobDurationInHours", "value": "120" }] }
] as Subscription[]
const openAIStudioBuiltInRoleIdsArray = [
  "8e3af657-a8ff-443c-a75c-2fe8c4bcb635", //Owner
  "b24988ac-6180-42a0-ab88-20f7382dd24c", //Contributor
  "25fbc0a9-bd7c-42a3-aa1a-3b75d497ee68", //Cognitive Services Contributor
  "a97b65f3-24c7-4388-baec-2e87135dc908", //Cognitive Services User
  "b59867f0-fa02-499b-be73-45a86b5b3e1c", //Cognitive Services Data Reader (Preview)
  "a001fd3d-188f-4b5d-821b-7da978bf7442", //Cognitive Services OpenAI Contributor
  "5e0bd9bd-7b93-4f28-af87-19fc36ad61bd", //Cognitive Services OpenAI User
];

const selectedTenant = { "id": "/tenants/72f988bf-86f1-41af-91ab-2d7cd011db47", "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47", "countryCode": "US", "displayName": "Microsoft", "domains": ["drawbridge.com", "expresslogic.com", "euevents.microsoft.com", "nonprofits.microsoft.com", "benefits.microsoft.com", "forzaesports.com", "bons.ai", "mobiledatalabs.com", "azmosa.io", "fslogix.com", "Howdy.ai", "Xoxco.com", "Botkit.ai", "glintinc.com", "maquette.ms", "tibazdev.microsoft.com", "mail.appcenter.ms", "Hexadite.com", "lobe.ai", "appcenter.ms", "github.com", "gearspop.com", "messages.microsoft.com", "flipgrid.com", "semanticmachines.com", "video2brain.com", "averesystems.com", "initiativegaming.com", "mail1.averesystems.com", "seaofthieves.com", "Intentional.com", "m12.vc", "email.bing.com", "playfab.com", "itsm.microsoft.com", "Windows.mail.microsoft.com", "smtphost.microsoft.com", "exmail.microsoft.com", "altvr.com", "altspacevr.com", "corp.microsoft.com", "cyclecomputing.com", "cloudyn.com", "nuget.org", "microsoftsmarthq.com.au", "lockbox.microsoft.com", "acompli.com", "domains.microsoft", "service.linkedin.com", "microsoft.com", "eventscommunication.microsoft.com", "deis.com", "Lynda.com", "Newsle.com", "linkedin.com", "myemailing.microsoft.com", "maluuba.com", "internal.linkedin.cn", "linkedin.biz", "microsoftcan.onmicrosoft.com", "educatorcommunity.microsoft.com", "simplygon.com", "MicrosoftAPC.onmicrosoft.com", "messages2.microsoft.com", "MicrosoftEur.onmicrosoft.com", "security.microsoft.com", "robovm.com", "solaircorporate.com", "azureemail.microsoft.com", "genee.me", "microsoftstudios.com", "bing.com", "corp.webtv.net", "HaloWaypoint.com", "musiwave.com", "navic.tv", "ntdev.corp.microsoft.com", "redmond.corp.microsoft.com", "europe.corp.microsoft.com", "middleeast.corp.microsoft.com", "exchange.corp.microsoft.com", "southamerica.corp.microsoft.com", "fareast.corp.microsoft.com", "winse.corp.microsoft.com", "mslpa.corp.microsoft.com", "windows.microsoft.com", "africa.corp.microsoft.com", "ntdev.microsoft.com", "wingroup.windeploy.ntdev.microsoft.com", "southpacific.corp.microsoft.com", "segroup.winse.corp.microsoft.com", "northamerica.corp.microsoft.com", "service.microsoft.com", "exchange.microsoft.com", "xbox.com", "zune.net", "msg.microsoft.com", "titanium.microsoft.com", "microsoft.mail.onmicrosoft.com", "filtering.exchange.microsoft.com", "skype.net", "hybrid.microsoft.com", "fbt.microsoft.com", "ageofempiresonline.com", "yammer-inc.com", "service.fbt.microsoft.com", "service.exchange.microsoft.com", "office365.microsoft.com", "crm.microsoft.com", "mssales.microsoft.com", "mssupport.microsoft.com", "smc.microsoft.com", "sharepointjournaling.exchange.microsoft.com", "wingroup.microsoft.com", "managed.microsoft.com", "serivce.exchange.microsoft.com", "primary.exchange.microsoft.com", "filtering.service.exchange.microsoft.com", "pioneer.exchange.microsoft.com", "wmislabcon01.redmond.corp.microsoft.com", "winfarmmail.ntdev.corp.microsoft.com", "WOSTIX-TEST.NTDEV.corp.microsoft.com", "SPSDOG4-27.redmond.corp.microsoft.com", "SPSDOG4-34.redmond.corp.microsoft.com", "spsdog4-16.redmond.corp.microsoft.com", "cyrusb-z400.redmond.corp.microsoft.com", "MOSSDOG2982.redmond.corp.microsoft.com", "osgwebindex.redmond.corp.microsoft.com", "wostcktiis01.redmond.corp.microsoft.com", "osgemail.redmond.corp.microsoft.com", "extranettest.microsoft.com", "pssupport.microsoft.com", "extranet.microsoft.com", "munich.microsoft.com", "news.microsoft.com", "mpsd.microsoft.com", "gmo.microsoft.com", "ims.microsoft.com", "partners.extranet.microsoft.com", "parttest.extranettest.microsoft.com", "placeware.com", "nokia.microsoft.com", "winse.microsoft.com", "surface.com", "rare.co.uk", "mds.microsoft.com", "mail.microsoft.com", "mailflowtest.mail.microsoft.com", "aspproject.nl", "ageofempires.com", "azure.com", "fast.no", "microsoft.co.nz", "live.co.hu", "groupme.com", "fastsearch.com", "microsoft.tm.hu", "microsoft.ccsctp.com", "perceptivepixel.com", "marketingpilot.com", "phonefactor.com", "lucernepublishing.com", "vexcel.co.at", "vexscan.com", "qik.com", "musiwave.net", "skype.com", "slimbezig.nl", "groove.net", "008.mgd.microsoft.com", "vexcel.at", "windowslive.co.hu", "xbox360.co.hu", "xbox.co.hu", "microsoft.eu", "Storesimple.com", "Phonefactor.net", "microsoft.onmicrosoft.com", "zone.com", "view012.de", "css.one.microsoft.com", "proclarity.com", "rareware.com", "mgd.microsoft.com", "064d.mgd.microsoft.com", "bingnews.microsoft.com", "api.yammer.com", "email.microsoft.com", "officelabs.microsoft.com", "Codenauts.com", "codenauts.de", "Hockeyapp.com", "qa2.parature.net", "componentart.com", "datazen.com", "nuvolarosa.eu", "bayiportali.mmdservice.com", "inside-r.org", "incentgames.com", "doublelabs.com", "Fantasysalesteam.com", "clickdimensions.Microsoft.com", "volometrix.com", "bluestripe.com", "time.microsoft.com", "revolutionanalytics.com", "inside-r.com", "revolution-computing.com", "fieldone.com", "Pioneerinteractive.com", "msitsupp.microsoft.com", "adxstudio.com", "Havok.com", "Trinigy.net", "Projectanarchy.com", "Rocketbox.de", "cloudappsecurity.com", "email-2.microsoft.com", "Swiftkey.com", "Swiftkey.net", "msfts2.onmicrosoft.com", "msfts2.mail.onmicrosoft.com", "Xamarin.com", "secureislands.com", "gears.gg", "promoteiq.com", "sangamemail.microsoft.com", "preonboarding.microsoft.com", "microsoftprd.onmicrosoft.com", "bluetalon.com", "citusdata.com", "spotfront.com", "dcat.microsoft.com", "jclarity.com", "msftdomains.microsoft.com", "msra.microsoft.com", "sales.microsoft.com", "askhr.microsoft.com", "idwebmail.microsoft.com", "movere.io", "Unifiedlogic.com", "mover.io", "msads.microsoft.com", "winautomation.com", "softomotive.com", "wsus.ci-fx.microsoft.com", "gta.microsoft.com", "email2.microsoft.com", "cloudtest.microsoft.com", "cyberx-labs.com", "elk-vepc-mon.microsoft.com", "pgsurvey.microsoft.com", "tex.quantum.microsoft.com", "healthcheck.microsoft.com", "TransportInAzure.microsoft.com", "robin-language.org", "githubenterprise.microsoft.com", "azcis.microsoft.com", "microsoft.affirmednetworks.com", "msconnectmail.microsoft.com", "mojang.com", "affirmedNetworks.com", "dmarc.microsoft", "stock.microsoft.com", "groups.metaswitch.com", "e-mail.microsoft.com", "bounce.e-mail.microsoft.com", "themarsdengroup.com", "globalmobility.microsoft.com", "showvine.com", "smash.gg", "clearui.com", "clearsoftware.com", "takelessons.com", "servicescout.com", "surveys.microsoft.com", "commuteconnection.linkedin.com", "sap.microsoft.com", "start.gg", "mail.support.microsoft.com", "trp.microsoft.com", "suplari.com", "erpsystem.microsoft.com", "p5cdn.com", "peer5.com", "azns.microsoft.com", "vc.linkedin.com", "cloudknox.io", "aka.ms", "communitysift.com", "2hatsecurity.com", "ezscans.net", "bookings.microsoft.com", "communities.linkedin.com", "xandr.com", "contractors.xandr.com", "gotoally.com", "kinvolk.io"], "tenantCategory": "Home", "defaultDomain": "microsoft.onmicrosoft.com", "tenantType": "AAD", "tenantBrandingLogoUrl": "https://aadcdn.msftauthimages.net/dbd5a2dd-n2kxueriy-dm8fhyf0anvulmvhi3kdbkkxqluuekyfc/logintenantbranding/0/bannerlogo?ts=636783560697171089" }
const azureSubscriptions = [{ "id": "/subscriptions/09e8ad18-7bdb-43b8-80c4-43ee53460e0b", "authorizationSource": "RoleBased", "managedByTenants": [{ "tenantId": "2f4a9838-26b7-47ee-be60-ccc1fdec5953" }], "tags": { "Environment": "Line of Business Application" }, "subscriptionId": "09e8ad18-7bdb-43b8-80c4-43ee53460e0b", "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47", "displayName": "Partner Portfolio DEV", "state": "Enabled", "subscriptionPolicies": { "locationPlacementId": "Internal_2014-09-01", "quotaId": "Internal_2014-09-01", "spendingLimit": "Off" } }]

export const selectResourceTab = ResourceTemplate.bind({});
selectResourceTab.args = {
  hasCreateNewResourceAction: true,
  onCreateNewResource: () => console.log("On Create New Resource"),
  selectedSubscription: subscriptions[0],
  subscriptions: subscriptions,
  selectedTenant,
  azureSubscriptions,
  onChangeResource: (selectedSubscription: Subscription) => {
    console.log('selectedSubscription', selectedSubscription);
  },
  createOpenAIResourceLink: "https://portal.azure.com?microsoft_azure_marketplace_ItemHideKey=microsoft_openai_tip&feature.isfromoai=true#create/Microsoft.CognitiveServicesOpenAI",
  learnMoreAboutCreatingCognitiveServicesSubscriptionLink: 'https://go.microsoft.com/fwlink/?linkid=2189193',
  openAIStudioBuiltInRoleIdsArray
} as ISelectResourceTabProps
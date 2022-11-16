
import { Panel, PanelType } from "@fluentui/react";

export const SharedPannel= (props: { 
    onClose?: () => void; 
    headerText:string;
 }) => {
    const { onClose, headerText } = props; 

    function onDismiss() {
        onClose?.();
    }
    
    function onLightDismissClick() {
        onClose?.();
    }
    
    return (
        <Panel
            className="profile-6te3ri77ie"
            isOpen={true}
            onDismiss={onDismiss}
            type={PanelType.custom}
            customWidth={"380px"}
            style={{ top: "40px" }}
            isLightDismiss
            onLightDismissClick={onLightDismissClick}
            headerText={headerText || ""}
            layerProps={{ eventBubblingEnabled: true }}
            styles={{ content: { height: "100%" }, scrollableContent: { height: "100%" } }}
        >
        </Panel>
    );
};

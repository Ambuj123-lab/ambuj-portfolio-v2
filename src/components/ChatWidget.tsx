import { useEffect } from 'react';

export default function ChatWidget() {
    useEffect(() => {
        // IBM Watsonx Assistant Integration
        (window as any).watsonAssistantChatOptions = {
            integrationID: "ab417c3b-5440-430a-bd23-07c062db2178", // The ID of this integration.
            region: "au-syd", // The region your integration is hosted in.
            serviceInstanceID: "f7c5f3bd-d0ff-4225-b9ab-c5df86168e55", // The ID of your service instance.
            onLoad: async (instance: any) => { await instance.render(); }
        };

        const t = document.createElement('script');
        t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + ((window as any).watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
    }, []);

    return null; // The widget renders itself
}

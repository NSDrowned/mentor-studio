import React, { useEffect } from "react";
import sdk from "@stackblitz/sdk";

const StackBlitz = (props) => {
    const { repoSlug, projectId, embedOpts = {}, openOpts, files, title, description, template = 'create-react-app', tags, dependencies, settings, ...other } = props || {};
    const project = { files, title, description, template, tags, dependencies, settings };

    useEffect(() => {
        const { elementOrId, ...otherEmbedOpts } = embedOpts;

        sdk.embedProject(elementOrId, project, otherEmbedOpts);
    }, [])

    return (
        <></>
    )
}

export default StackBlitz;
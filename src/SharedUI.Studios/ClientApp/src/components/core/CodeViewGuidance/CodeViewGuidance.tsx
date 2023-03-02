import { Stack, Text } from "@fluentui/react";
import { INTL } from "../../../util/intlUtil";
import { CodeViewGuidanceLocalizationFormatMessages } from "../../../clientResources";
import {
  initializeComponent,
  withLocalization,
} from "../../../services/localization";

import styled from 'styled-components';

const PreStyled = styled.pre`
    display: block;
    white-space: pre;
    margin: 1em 0px;
    color: rgb(248, 248, 242);
    background: rgb(43, 43, 43);
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    overflow-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    padding: 1em;
    margin: 0.5em 0px;
    overflow: auto;
    border-radius: 0.3em;
`
function CodeViewGuidanceWrapper() {
  return (
    <Stack>
      <Text className="highlight">
        {INTL.formatMessage(
          CodeViewGuidanceLocalizationFormatMessages.GuidMessage
        )}
      </Text>
      <PreStyled>
        <pre>
          <span>import {"{"} Prism as SyntaxHighlighter {"}"} from 'react-syntax-highlighter';</span>
          <br/>
          <span>import {"{"} dark {"}"} from 'react-syntax-highlighter/dist/esm/styles/prism';</span>
          <br/>
          <span>const Component = {'() => {'}</span>{" "}
          <br/>
          {"    "}<span>const codeString = {`'(num) => num + 1';`}</span>
          <br/>
          {"    "}<span>return {"("} </span>
          <br></br>
          <span>{"        "}{"<"}SyntaxHighlighter language="javascript" style={"{dark}>"}</span>
          <br />
          <span>{"          {codeString}" }</span>
          <br />
          <span>{"        </SyntaxHighlighter>"}</span>
          <br></br>
          <span>{'    );'}</span>
          <br></br>
          <span>{"};"}</span>
        </pre>
      </PreStyled>
    </Stack>
  );
}

export const CodeViewGuidance = withLocalization(initializeComponent(CodeViewGuidanceWrapper))
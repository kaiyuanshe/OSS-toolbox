import { FC } from 'react';
import {
  AudioTool,
  Editor,
  EditorProps,
  IFrameTool,
  ImageTool,
  OriginalTools,
  VideoTool,
} from 'react-bootstrap-editor';
import { Constructor } from 'web-utility';

const ExcludeTools = [IFrameTool, AudioTool, VideoTool];

const CustomTools = OriginalTools.filter(
  Tool => !ExcludeTools.includes(Tool as Constructor<IFrameTool>),
);

const HTMLEditor: FC<EditorProps> = props => (
  <Editor tools={CustomTools} {...props} />
);
export default HTMLEditor;

// Import stylesheets
import './style.css';
import 'highlight.js/styles/tomorrow-night-bright.css';

import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);

export interface BaseEntity {
  id?: string | null;
}

export interface Schema extends BaseEntity {
  model: string;
  modelPlural: string;
  description?: string;
  props?: Prop[];
}

export interface Prop {
  [key: string]: any;
}

export interface Config extends BaseEntity {
  name: string;
  application: string;
  scope: string;
}

// -------------------------------------------------------------------
// STEP ONE: Basic string manipulation
// -------------------------------------------------------------------

const UNDERSCORE = '_';
const DASH = '-';
const SPACE = ' ';

export const stripDashes = (s) => s.replace(/-/g, ' ');
export const stripUnderscores = (s) => s.replace(/_/g, ' ');
export const spaceWords = (s) => s.replace(/([a-z])([A-Z])/g, '$1 $2');
export const capitalizeWords = (s) => s.split(' ').map(capitalize).join(' ');
export const removeSpaces = (s) => s.split(' ').join('');

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const decapitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toLowerCase() + s.slice(1);
};

export const specialChars = (s, char) => {
  if (typeof s !== 'string') return '';
  return s.split(char).map(capitalize).join('');
};

export const specialCharsCustomJoin = (s, char, joinChar) => {
  if (typeof s !== 'string') return '';
  return s.split(char).map(capitalize).join(joinChar);
};

// -------------------------------------------------------------------
// STEP TWO: Casing with partial application
// -------------------------------------------------------------------

export const titleCase = (char) => (s) => specialChars(s, char);
export const camelCase = (char) => (s) => decapitalize(specialChars(s, char));
export const snakeCase = (char) => (s) =>
  specialCharsCustomJoin(s, char, UNDERSCORE).toLowerCase();

export const dashTitle = titleCase(DASH);
export const underscoreTitle = titleCase(UNDERSCORE);
export const spaceTitle = titleCase(SPACE);
export const dashCamelTitle = camelCase(DASH);
export const snakeCaseTitle = snakeCase(SPACE);

// -------------------------------------------------------------------
// STEP THREE: Transformation with functional principles
// -------------------------------------------------------------------

const _pipe = (a, b) => (arg) => b(a(arg));
export const transformPipe = (...ops) => ops.reduce(_pipe);

export const strip = transformPipe(stripDashes, stripUnderscores);
export const titlelize = transformPipe(strip, capitalizeWords);
export const labelize = transformPipe(titlelize, removeSpaces);
export const placeholderize = transformPipe(titlelize, spaceWords);
export const camelize = transformPipe(labelize, decapitalize);
export const snakeCaselize = transformPipe(strip, snakeCaseTitle);

export const modelNameVariations = (schema: Schema) => {
  const obj = dashCamelTitle(schema.model);
  const objs = dashCamelTitle(schema.modelPlural);
  const model = dashTitle(obj);
  const models = dashTitle(objs);
  const snakeCase = snakeCaselize(schema.model);
  const snakeCases = snakeCaselize(schema.modelPlural);
  const modelParam = `${obj}: ${model}`;
  const modelsParam = `${objs}: ${model}[]`;

  return {
    obj,
    objs,
    model,
    models,
    snakeCase,
    snakeCases,
    modelParam,
    modelsParam,
  };
};

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `
<h2>Model Name Variations</h2>
<pre>
<code class="language-typescript">Pending</code> 
</pre>
<hr />
<h2>Example Template</h2>
<pre>
<code class="language-typescript">Pending</code>  
</pre>
`;

hljs.highlightAll();

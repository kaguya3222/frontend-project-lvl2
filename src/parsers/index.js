import yaml from 'js-yaml';

export const parseJson = (file) => JSON.parse(file);

export const parseYaml = (file) => yaml.load(file);

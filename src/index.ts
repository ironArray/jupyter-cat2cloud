import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyter-cat2cloud extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-cat2cloud:plugin',
  description: 'Integration of JupyterLab with Cat2Cloud',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jupyter-cat2cloud is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyter-cat2cloud settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jupyter-cat2cloud.', reason);
        });
    }
  }
};

export default plugin;

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyter-cat2cloud extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-cat2cloud:plugin',
  description: 'Integration of JupyterLab with Cat2Cloud',
  autoStart: true,
  optional: [ISettingRegistry],
  requires: [INotebookTracker],
  activate: (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    settingRegistry: ISettingRegistry | null
  ) => {
    console.log('JupyterLab extension jupyter-cat2cloud is activated!');

    // Add a command
    const { commands } = app;
    const command = 'jlab-examples:main-menu';
    commands.addCommand(command, {
      label: 'Upload to server',
      caption: 'Upload to server',
      execute: (args: any) => {
        console.log(`Hello ${args['origin']}.`);
        const currentWidget = notebookTracker.currentWidget; // panel
        if (currentWidget !== null) {
          if (currentWidget.model !== null) {
            console.log('String', currentWidget.model.toString());
          }
        }
      }
    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyter-cat2cloud settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for jupyter-cat2cloud.',
            reason
          );
        });
    }
  }
};

export default plugin;

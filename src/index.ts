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
    // Add a command
    const { commands } = app;
    commands.addCommand('jlab-cat2cloud:main-menu', {
      label: 'Upload to server',
      caption: 'Upload to server',
      execute: (args: any) => {
        const currentWidget = notebookTracker.currentWidget; // panel
        if (currentWidget !== null) {
          if (currentWidget.model !== null) {
            const url = new URL(window.location.href);
            const path = url.searchParams.get('path') || '';
            const filename = path.split('/').pop();
            const content = currentWidget.model.toString();
            const blob = new Blob([content]);
            const formData = new FormData();
            formData.append('file', blob, filename);
            fetch(`/api/upload/${path}`, { method: 'POST', body: formData });
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

    console.log('JupyterLab extension jupyter-cat2cloud is activated!');
  }
};

export default plugin;

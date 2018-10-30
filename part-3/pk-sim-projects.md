# PK-Sim Projects

The organization of simulations is supported by PK-Sim® with a building block concept. Each project contains a **Building Block** window that comprises one or several building blocks for individuals, populations, compounds, formulations, protocols, events and observed data. Simulations that are created with the building blocks and comparisons of simulations are organized in a separate window. The user can create subfolders for organization of observed data, simulations and comparison.

{% hint style="info" %}
Only one project can be opened at a time in one PK-Sim® instance. If you wish to work on more than one project in parallel you may start separate instances of PK-Sim® for each individual project. If the identical project is already being accessed by yourself or by another user, PK-Sim® will warn you and open the project as read-only. You will still be able to use the project but won't be able to save your changes.
{% endhint %}

The following table gives an overview on how to manage projects using the **File** tab:

|Function, Icon|Shortcut|Description|
|--- |--- |--- |
|Create a new project <br><img width="32" src="../assets/icons/ProjectNew.png"> |Ctrl+N |A new project is generated. The current project is closed. If you have not saved the current project yet, you will be asked if you want to do so. If you answer Yes, all data belonging to the current project are saved using the current file-name. If the project/file name is undefined, a dialog window will open for you to specify the project name.|
|Open an existing project <br><img width="32" src="../assets/icons/ProjectOpen.png">|Ctrl+O |Select the *.pksim5 file you want to open. <br> • Only one project can be opened at a time. If a project is already open, you are asked if the currently open project should be saved before closing. <br>• If you wish to work on more than one project in parallel, you may start separate instances of PK-Sim® for each individual project.|
|Close the project <br><img width="32" src="../assets/icons/ProjectClose.png">| |The project is closed. If you have not yet saved the current project, you are asked if you want to do so. If you answer Yes, all data belonging to the project are saved using the current file-name. If the project/ file name is undefined, a will open for you to specify the project name. A new project can then be created, subsequently.|
|Save the project <br><img width="32" src="../assets/icons/Save.png">| |You can save your project by either selecting Save or Save as.|
|Show or edit project description <br><img width="32" src="../assets/icons/Description.png">| |You can enter, show or change a description for the project.|
|Export project to snapshot <br><img width="32" src="../assets/icons/SnapshotExport.png">| |Export current project to snapshot. <br>S. [Exporting Project to Snapshot / Loading Project from Snapshot](../part-3/importing-exporting-project-data-models.md#exporting-project-to-snapshot--loading-project-from-snapshot) for details.|
|Load project from snapshot <br><img width="32" src="../assets/icons/SnapshotImport.png">| |Create a new project from snapshot. <br>S. [Exporting Project to Snapshot / Loading Project from Snapshot](../part-3/importing-exporting-project-data-models.md#exporting-project-to-snapshot--loading-project-from-snapshot) for details.|
|Select Journal <br><img width="32" src="../assets/icons/JournalSelect.png">| |Assign a working journal to the current project. <br>S. [Shared Tools - Working Journal](../part-5/working-journal.md) for details.|
|About this application <br><img width="32" src="../assets/icons/About.png">| |An overview of the PK-Sim® version information is given.|
|Exit the application <br><img width="32" src="../assets/icons/About.png">|Ctrl+X |PK-Sim® is closed. If you have not yet saved the current project, you are asked if you want to do so. If you answer Yes, all data belonging to the project are saved using the current file-name. If the project name is undefined, a dialog window will open for you to specify the project name.|

The visualization of a project is organized in different panels. Each panel can be hidden or be made visible by clicking on the respective icon in the **Panel View** group of the **Modeling & Simulation** Tab. The panels have the following meaning:

|Panel, Icon| Description |
|--- |--- |
|Building Blocks <br><img width="32" src="../assets/icons/BuildingBlockExplorer.png">| Within this panel the building blocks **Individuals**, **Populations**, **Compounds**, **Formulations**, **Administration Protocols**, **Events** and **Observed Data** are organized and can be accessed.  Detailed information for each building block can be found in:<br> ● [PK-Sim® - Creating Individuals](../part-3/pk-sim-creating-individuals.md)<br> ● [PK-Sim® - Creating Populations](../part-3/pk-sim-creating-populations.md)<br> ● [PK-Sim®- Compounds: Definition and Work Flows](../part-3/pk-sim-compounds-definition-and-work-flow.md)<br> ● [PK-Sim® - Formulations](../part-3/pk-sim-formulations.md)<br> ● [PK-Sim® - Administration Protocols](../part-3/pk-sim-administration-protocols.md)<br> ● [PK-Sim® - Events](../part-3/pk-sim-events.md)<br> ● [Shared Tools - Import and Edit of Observed Data](../part-5/import-edit-observed-data.md).|
|Simulations | In this panel all simulations of a project are managed.  A detailed description on how simulations are set up and managed can be found in PK-Sim® - Simulations.|
|History Manager | Every user action performed within a given project work is documented within this panel.  Features of the History Manager are described in Shared Tools - History manager and history reporting.|

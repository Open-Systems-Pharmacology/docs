# PK-Sim Projects

The organization of simulations is supported by PK-Sim® with a building block concept. Each project contains a **Building Block** window that comprises one or several building blocks for individuals, populations, compounds, formulations, protocols, events and observed data. Simulations that are created with the building blocks and comparisons of simulations are organized in a separate window. The user can create subfolders for organization of observed data, simulations and comparison.

{% hint style="info" %}
Only one project can be opened at a time in one PK-Sim® instance. If you wish to work on more than one project in parallel you may start separate instances of PK-Sim® for each individual project. If the identical project is already being accessed by yourself or by another user, PK-Sim® will warn you and open the project as read-only. You will still be able to use the project but won't be able to save your changes.
{% endhint %}

The following table gives an overview on how to manage projects using the **File** tab:

|Function, Icon|Shortcut|Description|
|--- |--- |--- |
|Create a new project |Ctrl+N |• A new project is generated. The current project is closed. If you have not saved the current project yet, you will be asked if you want to do so. If you answer Yes, all data belonging to the current project are saved using the current file-name. If the project/file name is undefined, a dialog window will open for you to specify the project name.|
|Open an existing project |Ctrl+O |• Select the *.pksim5 file you want to open. <br> • Only one project can be opened at a time. If a project is already open, you are asked if the currently open project should be saved before closing. <br>• If you wish to work on more than one project in parallel, you may start separate instances of PK-Sim® for each individual project.|
|Close the project | |• The project is closed. If you have not yet saved the current project, you are asked if you want to do so. If you answer Yes, all data belonging to the project are saved using the current file-name. If the project/ file name is undefined, a will open for you to specify the project name. A new project can then be created, subsequently.|
|Save the project | |• You can save your project by either selecting Save or Save as.|
|Show or edit project description | |You can enter, show or change a description for the project.|
|About this application | |An overview of the PK-Sim® version and license information is given.|
|Register a new license | |• If you have obtained a new license key you can register it by clicking on this icon.|
|Exit the application |Ctrl+X |• PK-Sim® is closed. If you have not yet saved the current project, you are asked if you want to do so. If you answer Yes, all data belonging to the project are saved using the current file-name. If the project name is undefined, a dialog window will open for you to specify the project name.|

The visualization of a project is organized in different panels. Each panel can be hidden or be made visible by clicking on the respective icon in the **Panel View** group of the **Modeling & Simulation** Tab. The panels have the following meaning:

|Panel, Icon| Description |
|--- |--- |
|Building Block | Within this panel the building blocks **Individual**, **Population**, **Compound**, **Formulation**, **Administration Protocol**, **Event** and **Observed Data** are organized and can be accessed.  Detailed information for each building block can be found in: PK-Sim® - Creating Individuals <br> PK-Sim® - Creating Populations <br>PK-Sim®- Compounds: Definition and Work Flows <br>PK-Sim® - Formulations <br>PK-Sim® - Administration Protocols <br>PK-Sim® - Events.|
|Simulations | In this panel all simulations of a project are managed.  A detailed description on how simulations are set up and managed can be found in PK-Sim® - Simulations.|
|History Manager | Every user action performed within a given project work is documented within this panel.  Features of the History Manager are described in Shared Tools - History manager and history reporting.|
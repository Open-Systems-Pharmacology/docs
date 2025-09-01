# Options

MoBi can be customized using several options. To do this, click on the **Options** Button <img src="../assets/icons/Settings.svg" data-size="line"/> within the **Utilities** Ribbon Tab.

**Active skin**: The program's graphical appearance can be changed by changing the skin in the Skins group next to the Options icon.

## General Tab

- **Rename Dependent Elements**: When renaming an element (e.g., a container in the spatial structure), all dependent elements (e.g., neighborhoods, passive transports, initial conditions, observers) will be renamed automatically to maintain consistency. If this option is disabled, only the selected element will be renamed, and all dependent elements will keep their original names. This may lead to inconsistencies in the model.

{% hint style="warning" %}
Always check which elements are renamed when this option is enabled. Sometimes, not all suggested renamings are desired
{% endhint %}

-   **Number of recent file items shown**: Changes the number of recent documents displayed within the File Tab. The program needs to be restarted for the changes to take effect.
- **Decimal places**: Changes the number of decimal places shown in numerical fields throughout the application.

- **Max. number of processors to use**: Changes the maximum number of processors used for tasks that can be executed in parallel (population simulations, parameter identification, parallel execution of simulations).

### Validation Options

- **Show warnings from PK-Sim standard observers**: If selected, warnings will be generated if observers imported from PK-Sim (e.g., plasma concentration observer) cannot be created. E.g., if you add an organ tagged with "TissueOrgan" but without the "Intracellular"-compartment - MoBi will try to create a "Tissue" observer in this new organ and fail. The simulation will still be created, but a warning will be shown or not depending on this option.
- **Show warnings for unresolved endosome containers**: When creating a simulation for small molecules model (without the `Endosome` container), some of the parameters of protein expression will not be created, as they refer to the `Endosome` container. If this option is enabled, a warning will be shown in the **Notifications** view if such unresolved containers are detected. See the [GitHub discussion](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1112) for more details.
- **Validate dimensions**: Enables or disables dimension validation for formulas. If enabled, the application will check if the calculated dimensions of formulas are consistent with the dimension of the entity the formula is assigned to. If the dimensions are inconsistent, a warning will be shown in the **Notifications** view.
- **Show warnings when formulas dimension could not be calculated**: If enabled, a warning will be shown in the **Notifications** view if the dimension of a formula could not be calculated.
- **Show known dimension warnings for PK-Sim parameters**
- **Validate value constraints**: Enables or disables value constraint validation for parameters. If enabled, the application will check if the values assigned to parameters are within the defined constraints (e.g., min/max values). If a value is outside the constraints, a warning will be shown in the **Notifications** view.
- **Perform circular reference check**

## Diagram Options Tab

## Chart Options Tab

- **Show Simulation Name in Curve Name**: If enabled, the name of the simulation will be included in the name of the curves in charts.
- **Show Top Container Name in Curve Name**: If enabled, the name of the top container will be included in the name of the curves in charts.
- **Default layout**: 
-  **Default chart y scale**: Default scaling (lin or log) of the y axis in new time-profile charts.
- **Color group observed data from same folder when dropping to chart**: If enabled, when adding observed data sets to a chart via drag-and-drop from a folder (or multiple folders) within the "Observed Data" group, all data sets within one folder will get the same color.

## Default Display Units Tab

## **Application** Tab

-   **PK-Sim executable path**: Path to the location of the PKSim.exe file

- **Use watermark**: If enabled, a watermark will be displayed in the background of the charts.
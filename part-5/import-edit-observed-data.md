# Shared Tools - Import and Edit of Observed Data

A generic tool for handling observed data within the Open Systems Pharmacology Suite is used in both applications (PK-Sim® and MoBi®) for importing observed data from Microsoft Excel® or CSV files.

## Supported Formats

All files need to fulfil the following pre-requisites:

* A file contains one or several sheets with data tables.
* Column headers are in the first non-empty row.

Each data table:

* **must** have at least 2 data columns with numeric values: one column with **time** values and one column with  **measurement** values. 
* **can** have additional data column with numeric values for measurement **error** values 
* **can** have additional data column with numeric values for the *lower limit of quantification* (**LLOQ**)
  * It is also possible to provide LLOQ values directly in the measurement column (s. [LLOQ](#lloq) for details)
* **can** have arbitrary number of further numeric or non-numeric data columns, which can be interpreted as **meta data** which describes a *data set* (e.g. "Study Id", "Subject Id", "Organ", "Compartment",  ...). S. [Data sets](#data-sets) for the explanation how meta data is used to split a data table into different data sets.

The order and the naming of data columns is not important: the proper assignment of data columns to *Time*/*Measurement*/*Error*/*Meta Data* will be performed during the [*column mapping*](#mapping-panel) process. However to speed up the mapping process it is advisable to name the columns according to their information (e.g. "Time" for the time column etc.)

**Units** of numeric columns (Time/Measurement/Error) can be defined in 2 ways (s. [units](#selection-of-units) for details):

* Either as part of the header caption in the square brackets (e.g. "*Time [h]*"). In this case all values of the data column will have the same unit.
* Or in a separate column. 

If no unit is specified (or the specified unit is not valid or not supported by OSP: it can be set manually during the [*column mapping*](#mapping-panel) process).

Some examples:

* Minimal possible example: time and measurement columns; units in the same column

  | Time [min] | Concentration [mg/ml] |
  | ---------- | --------------------- |
  | 1          | 0,1                   |
  | 2          | 12                    |
  | 3          | 2                     |
  | 10         | 1                     |
  | 20         | 0,01                  |

* Time, measurement and error; units in the column header

  | Time [min] | Concentration [mg/ml] | Error [mg/ml] |
  | ---------- | --------------------- | ------------- |
  | 1          | 0,1                   |               |
  | 2          | 12                    | 3             |
  | 3          | 2                     | 1,9           |
  | 10         | 1                     | 0,8           |
  | 20         | 0,01                  |               |

* Time, measurement, error, LLOQ, additional meta data; units in the column header

  | Time [min] | Organ | Compartment | Dose | Route | Concentration [mg/ml] | Error | LLOQ |
  | ---------- | ----- | ----------- | ---- | ----- | --------------------- | ----- | ---- |
  | 1          | Brain | Plasma      | 1 mg | Oral  | 0,1                   |       |      |
  | 2          | Brain | Plasma      | 1 mg | Oral  | 12                    | 2     |      |
  | 3          | Brain | Plasma      | 1 mg | Oral  | 2                     | 0,5   |      |
  | 10         | Brain | Plasma      | 1 mg | Oral  | 1                     |       |      |
  | 20         | Brain | Plasma      | 1 mg | Oral  | 0,01                  |       | 0,1  |
  | 1          | Liver | Plasma      | 2 mg | IV    | 0,2                   |       |      |
  | 2          | Liver | Plasma      | 2 mg | IV    | 8                     |       |      |
  | 3          | Liver | Plasma      | 2 mg | IV    | 2                     |       |      |
  | 10         | Liver | Plasma      | 2 mg | IV    | 0,5                   |       |      |
  | 20         | Liver | Plasma      | 2 mg | IV    | 0,05                  |       | 0,2  |

* Time/Measurement/Metadata; units in separate columns; LLOQ in the measurement column

  | Time | Time_Unit | Organ | Compartment | Concentration | Concentration_Unit |
  | ---- | --------- | ----- | ----------- | ------------- | ------------------ |
  | 1    | min       | Brain | Plasma      | <0,1          | mg/ml              |
  | 2    | min       | Brain | Plasma      | 12            | mg/ml              |
  | 3    | min       | Brain | Plasma      | 2             | mg/ml              |
  | 10   | min       | Brain | Plasma      | 1             | mg/ml              |
  | 20   | min       | Brain | Plasma      | <0,1          | mg/ml              |
  | 0    | h         | Liver | Plasma      | 0,2           | µmol/l             |
  | 1    | h         | Liver | Plasma      | 8             | µmol/l             |
  | 2    | h         | Liver | Plasma      | 2             | µmol/l             |
  | 5    | h         | Liver | Plasma      | 0,5           | µmol/l             |
  | 10   | h         | Liver | Plasma      | 0,05          | µmol/l             |

* Time/Measurement/MetaData; units partly in column headers and partly in separate columns; error unit assumed to be the same as measurement unit

  | Time [min] | Organ | Compartment   | Measurement | Type          | Measurement_Unit | Error |
  | ---------- | ----- | ------------- | ----------- | ------------- | ---------------- | ----- |
  | 1          | Brain | Plasma        | 0,1         | Concentration | mg/ml            |       |
  | 2          | Brain | Plasma        | 12          | Concentration | mg/ml            | 2     |
  | 3          | Brain | Plasma        | 2           | Concentration | mg/ml            | 0,5   |
  | 10         | Brain | Plasma        | 1           | Concentration | mg/ml            |       |
  | 20         | Brain | Plasma        | 0,01        | Concentration | mg/ml            |       |
  | 1          | Liver | Intracellular | 10          | F_metabolized | %                |       |
  | 2          | Liver | Intracellular | 20          | F_metabolized | %                |       |
  | 3          | Liver | Intracellular | 25          | F_metabolized | %                |       |
  | 10         | Liver | Intracellular | 30          | F_metabolized | %                |       |
  | 20         | Liver | Intracellular | 39          | F_metabolized | %                |       |

### Data sets

A **data set** describes all observed data which belongs to a combination of all **mapped** meta data columns (s. [Mapping panel](#mapping-panel)). Thus the number of data sets which is created from one observed data table is the same as the number of unique combination of the used meta data.

Example:  let's assume the observed data table looks like below and *Organ*, *Compartment* and *Route* are all used as meta data during the import configuration process.

| Time   [min] | Concentration   [mg/ml] | Organ | Compartment | Route |
| ------------ | ----------------------- | ----- | ----------- | ----- |
| 1            | 0,1                     | Brain | Plasma      | Oral  |
| 2            | 12                      | Brain | Plasma      | Oral  |
| 3            | 2                       | Brain | Plasma      | IV    |
| 10           | 1                       | Brain | Plasma      | IV    |
| 20           | 0,01                    | Brain | Plasma      | IV    |
| 1            | 0,2                     | Liver | Plasma      | Oral  |
| 2            | 8                       | Liver | Plasma      | Oral  |
| 3            | 2                       | Liver | Plasma      | IV    |
| 10           | 0,5                     | Liver | Plasma      | IV    |
| 20           | 0,05                    | Liver | Plasma      | IV    |

Then this data will be split into 4 data sets corresponding to the available combinations of 

`{Organ, Compartment, Route}`: 

![Import result: Observed data sets](../assets/images/part-5/ImportResult-ObservedDataSets.PNG)

* Data set 1: "`Brain.Plasma.IV`"

  | Time   [min] | Concentration   [mg/ml] |
  | ------------ | ----------------------- |
  | 3            | 2                       |
  | 10           | 1                       |
  | 20           | 0,01                    |

* Data set 2: "`Brain.Plasma.Oral`"

  | Time   [min] | Concentration   [mg/ml] |
  | ------------ | ----------------------- |
  | 1            | 0,1                     |
  | 2            | 12                      |

* Data set 3: "`Liver.Plasma.IV`"

  | Time   [min] | Concentration   [mg/ml] |
  | ------------ | ----------------------- |
  | 3            | 2                       |
  | 10           | 0,5                     |
  | 20           | 0,05                    |

* Data set 4: "`Liver.Plasma.Oral`"

  | Time   [min] | Concentration   [mg/ml] |
  | ------------ | ----------------------- |
  | 1            | 0,2                     |
  | 2            | 8                       |

## Import Workflow

The general process of importing observed data is outlined here. A detailed description is provided in the following subsections.

To import data, you should do the following:

1. Click on "**Add Observed Data...**" in the context menu of "**Observed Data**" in the Building Blocks explorer of PK-Sim® or MoBi®:
    ![Add Observed Data](../assets/images/part-5/AddObservedData.png)
    * In  PK-Sim® you can also preselect for which molecule observed data should be imported. For this, click on "Add Observed Data for" and select a molecule from the dropdown list:

![Add Observed Data for](../assets/images/part-5/AddObservedDataFor.png)

2.  Select the input file (see [File Selection](#file-selection)).
3.  Specify the **column mapping** (see [Mapping panel](#mapping-panel)), enter all required metadata and set the unit and LLOQ information.
4.  [Optionally] Apply **data filters** to exclude some data sets/values from import (see [Data preview](#preview-of-imported-and-original-data)).
5.  Add one or more sheets to the import preview. Sheets that should not be imported can be closed by clicking the "x" or the context menu.
6.  [Optionally] Adjust column mapping and/or data filtering. Upon editing of the column mapping, the data preview is re-interpreted and updated automatically. The configured mapping remains the same for the whole import process, and all the imported sheets will be using the same mapping. If you want to import data with different mappings, you have to do this in separate imports.
7.  [Optionally] Adjust the **naming pattern** of the data sets to be imported.
8.  Complete the transfer of the imported data sheets by clicking the import button.

### File Selection

To import a new set of data from a file, click on the **Add Observed Data** button in the context menu of the observed data and specify the file to be imported.

{% hint style="warning" %}
The input file must comply with one of the supported formats. If only one sheet does not comply to any of the supported formats, the file is considered invalid and cannot be imported. The import process is stopped. 
{% endhint %}

{% hint style="warning" %}
Both excel file formats (.xls and .xlsx), as well as CSV files (.csv, .nmdat), are supported, and it is **not** required to have Microsoft Excel® installed on your computer.
{% endhint %}

{% hint style="tip" %}
By switching the file type combo box value, it is possible to import a comma-separated values file (.csv or .nmdat). For such files, the user is prompted to select the column separator used for parsing. Supported separators are ';', ',', '.', and tabulator. Values can be enclosed in double quotes.
{% endhint %}

### Preview of imported and original data

After selecting the file, a split window appears (see the screenshot below). 

The left panel ("*Mapping settings*") is described in detail in the next section ([Mapping Panel](#mapping-panel)).

The right panel shows a preview of the imported data file, each tab representing one sheet. 

![Importer Window](../assets/images/part-5/ImporterInitialWindow.png)

Sheets can be closed by clicking the 'x' or by right-clicking on a tab and selecting one of the options displayed. Closed sheets will not be imported and need not comply with the current data mapping. The user can retrieve all closed sheets of a document by the context menu option "Reopen all sheets".

{% hint style="warning" %}
If the user closes an already loaded sheet, it will be removed from the loaded sheets!
{% endhint %}

![Importer Sheet Context Menu](../assets/images/part-5/ImporterSheetContextMenu.png)

The data preview table offers various possibilities for filtering and sorting the data. One can use the filter symbol in the column header of the data to open the filter menu (see screenshot below). By right-clicking the column name, the user can sort the data according to a specific column or open the 'Filter Editor' to create more sophisticated filters (s. [this tutorial](https://devexpress.github.io/dotnet-eud/interface-elements-for-desktop/articles/filter-editor/examples-of-using-the-filter-editor.html) and [this video tutorial (up to minute 2:55)](https://www.youtube.com/watch?v=A6OgNirrPaE#t=27s) for examples).

![Importer Data Table Column Filter](../assets/images/part-5/ImporterTableColumnFilter.png)![Importer Filter Editor](../assets/images/part-5/ImporterFilterEditor.png)

{% hint style="warning" %}
By default, the defined filter changes only the **preview** of the data. The user can choose to restrict **importing** to the filtered data by checking the checkbox "Use the filters for importing the data" under the data preview table.  
{% endhint %}

There are two buttons for adding data to the import preview - one for adding the current sheet that the user is viewing and the other to add all currently open sheets of the file. In the latter case, **all** opened sheets need to comply to the current data mapping.

On the top-right part of the window, one can see the path of the selected source file and also use the "..."-button to select a new file. Selecting a new file, though, will cause the mapping and loaded sheets to be reset, and the work you have done on the current input file will be lost.

### Mapping panel

The left panel of the window displays the mapping of the imported data column to the time, measurement, error values and to the meta data of the observed data sets. The initial mapping is performed automatically upon selection of the file and identification of the format, but it can be overwritten by adjusting the entries. This initial mapping recognizes the settings automatically if the data is structured properly. The discovery of columns occurs as follows:

1. Target data columns (Time, Measurement, Error) are resolved. If the data contains any column with numerical data and a header starting with the target name, the column is mapped. The search is not case sensitive. The following column headers will be recognized as the "Measurement" target data column for example:
   - "Measurement"
   - "Measurement (12.02.2021)"
   - "MEASUREMENT [MG/ML]"
   - "  measurement old [old unit] [mg/ml] "
2. The unit of recognized target data columns are resolved. If the data contains any column with a header starting with the target name followed by "_unit", the column is mapped as the unit. The search is not case sensitive. The following column headers will be recognized as the time unit for example:
   - "Time_unit"
   - "Time_unit (12.02.2021)"
   - "TIME_UNIT [MG/ML]"
   - "  Time_unit old [old unit]  "
3. Meta data columns (Species, Organ, Compartment, Molecule, Molecular Weight, Study Id, Subject Id, Gender, Dose, Route) are resolved. If the data contains any column with a header starting with the target name, the column is used for such a mapping. The search is not case sensitive. The following column headers will be recognized as the "Species" mapping for example:
   - "Species"
   - "Species (12.02.2021)"
   - "SPECIES []"
   - "  species old [old data]  "
4. All columns on the data containing numerical data has not been used yet and will be used for any still missing target data column in the order they are (e.g., Example file 3).

Consider the following examples:

Example file 1.

| Organ                 | Compartment  | Species | Dose           | Molecule         | Time [min] | Concentration [mg/l] | Error [mg/l] | Route | Group Id | a    | b    |
| --------------------- | ------------ | ------- | -------------- | ---------------- | ---------- | -------------------- | ------------ | ----- | -------- | ---- | ---- |
| PeripheralVenousBlood | Arterialized | Human   | 75 [g] glucose | GLP-1_7-36 total | 1          | 2                    | 0,1          | po    | H        | 3    | 3    |
| PeripheralVenousBlood | Arterialized | Human   | 75 [g] glucose | GLP-1_7-36 total | 2          | 19                   | 0,1          | po    | H        | 3    | 3    |
| PeripheralVenousBlood | Arterialized | Human   | 75 [g] glucose | GLP-1_7-36 total | 3          | 23                   | 0,1          | po    | H        | 3    | 3    |
| PeripheralVenousBlood | Arterialized | Human   | 75 [g] glucose | GLP-1_7-36 total | 4          | 19                   | 0,1          | po    | H        | 3    | 3    |

Results in the following mapping:

| Data  Column         | Mapping     |
| -------------------- | ----------- |
| Organ                | Organ       |
| Compartment          | Compartment |
| Species              | Species     |
| Dose                 | Dose        |
| Molecule             | Molecule    |
| Time [min]           | Time        |
| Concentration [mg/l] | Measurement |
| Error [mg/l]         | Error       |
| Route                | Route       |
| a                    | -           |
| b                    | -           |

Example file 2.

| Organ                 | time (old) | time_unit (new) | c    |
| --------------------- | ---------- | --------------- | ---- |
| PeripheralVenousBlood | 1          | h               | 75   |
| PeripheralVenousBlood | 2          | h               | 75   |
| PeripheralVenousBlood | 3          | h               | 75   |
| PeripheralVenousBlood | 240        | min             | 75   |

Results in the following mapping:

| Data  Column    | Mapping                        |
| --------------- | ------------------------------ |
| Organ           | Organ                          |
| time (old)      | Time                           |
| time_unit (new) | Column containing unit of time |
| c               | Measurement                    |



Example file 3.

| e    | time (old) | time_unit (new) | c    |
| ---- | ---------- | --------------- | ---- |
| 75   | 1          | h               | 1    |
| 75   | 2          | h               | 1    |
| 75   | 3          | h               | 1    |
| 75   | 240        | min             | 1    |

Results in the following mapping:

| Data  Column    | Mapping                        |
| --------------- | ------------------------------ |
| time (old)      | Time                           |
| time_unit (new) | Column containing unit of time |
| e               | Measurement                    |
| c               | Error                          |

{% hint style="tip" %}
The mapping panel is available throughout the whole import process. If the user changes the mapping, the changes are automatically applied to all data sheets, and the result of the modified mapping is automatically updated. 
{% endhint %}

As shown in the screenshot below, the user gets a view of all the available mappings and can map a column to them. A column can be selected to a mapping only once and will no longer be available on the drop-down menus for other mappings, with one exception: the unit column for the measurement can also be mapped as the unit column for the corresponding error. 

![Importer Selecting an Excel Column](../assets/images/part-5/ImporterSelectingExcelColumn.png)

Additionally, for some meta data mappings (e.g., Organ, Species and others), the user can select one option from the predefined ones that come from PK-Sim/MoBi. E.g. for the Organ mapping in the example below user could either map the Organ meta data to the source data column "Organ" or set it to any of predefined values ("*Peripheral venous blood*", ..., "*Spleen*", "*Stomach*"). 

In the latter case: the selected predefined value will be used as "Organ" for ALL imported data sets.

![List of values](../assets/images/part-5/Import-ListOfValues.PNG)

{% hint style="warning" %}
The minimum set of a valid data mapping includes a 'Time' and a 'Measurement' mapping. 
{% endhint %}

For the molecule mapping, a column from the sheet can be selected. Alternatively, the user can select from a drop-down menu of the available molecules from the project or specify a new molecule manually by clicking "Edit manually" under "Edit extra fields".

![Mapping molecules](../assets/images/part-5/Import-Map-Molecule.PNG)

The user can also add one or more '**Group by**'-mappings. Those mappings are used to define *additional* meta data and will be used together with the *predefined* meta data ("*Organ*", "*Compartment*", ...) to break down a single data sheet into multiple data sets as described in [Data sets](#data-sets).

![Add GroupBy](../assets/images/part-5/Import-AddGroupBy.PNG) 

{% hint style="note" %}
The mapping can be reset by right-clicking on the mapping panel and selecting one of the displayed options.
{% endhint %}

![Observed data mapping context menu](../assets/images/part-5/ObsData-MApping-ContextMenu.PNG)

#### Selection of units

The units for the mapped columns can either be manually entered or specified by a column. In the latter case, each data point can have a distinct unit but from the same dimension. In the unit dialog, the mode of unit definition can be selected. If the unit is specified as part of the header name (e.g. *Time[h]*) it is automatically recognized by the importer. The user can edit the unit by opening the dialog in the column "**Edit extra fields**" of the corresponding mapping.

![Setting the units manually](../assets/images/part-5/ImporterSetUnits.png)


![Setting the units from a column](../assets/images/part-5/ImporterSelectUnitFromColumn.png)

When setting the unit manually, the user needs to select the dimension first, upon which the unit drop-down menu will be filled corresponding units.

#### LLOQ

The LLOQ can either be specified from the column of the measurement or from a separate column. In the first case, the LLOQ values in the measurement column must be preceded by a "<", e.g. "<0.2", where 0.2 is the LLOQ value. In the second case, there can only be one single LLOQ value for every data set. In case there are several LLOQ values defined, the user is warned, and in case the user wants to proceed with the import, the highest of these LLOQs will be assumed for the whole data set. for the values that are below the LLOQ, the measurement assigned is LLOQ/2. For example "<0.2" will be imported in the data repository as "0.1".

#### Configuring the error

The error can be set to '**Arithmetic Standard Deviation**' or '**Geometric Deviation**'. Since the geometric deviation is dimensionless, it is not possible to specify a unit for it. Otherwise, the user can specify the unit either manually or by a column.
The dimension of the measurement and the error unit, as well as their source (manually entered or specified by a column), have to be consistent. This is checked when loading the sheet, and data with inconsistent dimensions cannot be imported.

When the unit is configured as manual input, the user must first select the "Dimension" from the drop-down, and then the corresponding units to this dimension will become available in the "Unit" drop-down menu.

![Selecting Error Type](../assets/images/part-5/ImporterSelectingErrorType.png)

#### Molecular weight

Concentration data can be imported either in molar units (e.g. [µmol/l]) or in mass units (e.g. [mg/ml]). In order to switch between molar and mass units (e.g. to display the data which was imported in [µmol/l] in [mg/ml]) it is required to specify the **Molecular weight** of a data set.

This can be done either by mapping of the data set to a molecule or by mapping of the molecular weight to a data column.

* If neither **Molecule** nor the **Molecular Weight** are mapped: the molecular weight of all data sets is not set.

* If only the **Molecule** (but not the **Molecular Weight**) is mapped to a data source column or is set to specific value: the software (PK-Sim® /MoBi®) will check for each data set if the **molecule with the name assigned to the data set is available in the project**:

  * If yes: observed data set will be automatically assigned the molecular weight of this compound.
  * If no: molecular weight of the given data set is undefined. However, if a new molecule with the name assigned to the data set is added to the project later on: observed data set will automatically become the molecular weight of this molecule.  

![](../assets/images/part-5/Import-MW-Molecule.PNG)

{% hint style="tip" %}
If molecular weight of the molecule is changed by user: molecular weight of all data sets linked to this molecule via the "Molecule" meta data will be automatically adjusted to the new value. 
{% endhint %}

{% hint style="tip" %}
If the "Molecule" meta data was not mapped during the import process - it can be done later by editing the meta data of an observed data set.
{% endhint %}

* If only the **Molecular Weight** (but not the **Molecule**) is mapped to a data source column: the value of the molecular weight is taken from the mapped data source column.
  * In such a case: mapped data column must contain the **same** molecular weight value for all rows of a data set - otherwise the import is not possible

![](../assets/images/part-5/Import-MW-MW.PNG)

* If the **Molecule** is mapped to a data source column or is set to specific value and  the **Molecular Weight** is mapped as well:
  * For each data set for which the **molecule name is not available in the project**: molecular weight will be taken from the imported data column as described above
  * For each data set which the **molecule name is available in the project**: molecular weight from the data column will be compared with the molecular weight of the molecule in the project. If they differ - import is not possible. Otherwise, the data set will automatically become the molecular weight of "its" molecule as described above.

![](../assets/images/part-5/Import-MW-MW-Molecule.PNG)

### The NaN indicator

It is possible to define a specific number (e.g. 99999) as an equivalent of NaN. The value and the importer's action on the occurrence of this value can be defined on the bottom of the left panel. On the input field "NaN indicator" the user can specify the value that should be identified as NaN. This value has to be a **numeric** value - it cannot be alphanumeric. In the drop-down menu below, the user can specify to either ignore the whole row containing the NaN value ("Ignore the row"), or to prevent the import ("Prevent the import"). In this case, a pop-up message appears to inform the user of the existence of a NaN value, prompting him to clean up his data and preventing him from importing. 

### Confirmation Tab

Data sets can be added to preview by clicking on "**Add current sheet**" or "**Add all sheets**":

![Add data sheet(s) to preview](../assets/images/part-5/Import-AddDataSheets.PNG)

When at least one data set has been added to the preview, the confirmation tab "**Import preview**" gets activated. 

![Confirmation Tab](../assets/images/part-5/ImporterConfirmationTab.png)

Here, the user can see which data sets have already been loaded. On selecting a data set, the data are being previewed to the right, both as values and in a chart form. The naming with which the data will be imported can be specified on the left side of the panel. This can be done by manually typing in the "Naming Pattern" input field: The user can type keys that represent the name of a mapping inside of curly brackets {}. This will be replaced by the corresponding value for every individual data set. The user is also free to write text that will then be the same for all the data sets names. Additionally, a drop-down with presets for naming patterns is also available. 

Alternatively, the "Create naming pattern" collapsible panel can be used. One or more 'Naming Elements' can be selected from the list, along with a separator that will be used between these elements. By clicking "Add keys", they are added to the naming pattern. 

The import can be finalized by clicking on the **Import** button.

## Saving the configuration

By clicking the "**Save configuration**"-button, the user can save all configuration settings to an .xml file. This configuration includes the mapping, the NaN preferences, the selected sheets, the path to the selected file and all the other information that can be configured in the importer (data filters, naming pattern, ...).

The saved configuration can be used to resume the configuring at a later time point or to import a different file that should be imported with exactly the same configuration.

![Save/Load configuration](../assets/images/part-5/Import-SaveLoadConfig.PNG)

{% hint style="note" %}
If some sheets have already been loaded, this state is also part of the configuration. 
{% endhint %}

## Loading the configuration

The user can also load a saved configuration. Clicking the "Load configuration" button will open a "File Selection" menu where the user can select a previously saved configuration .xml file. The settings of that configuration are then applied to the current import process. If something is missing, for example, a column was mapped in the configuration but does not exist in the file the user is trying to load now, the user will receive a warning that this mapping could not be found and will be ignored. 
 {% hint style="note" %}
Missing columns will be ignored.
{% endhint %}

## Editing Observed Data

Once a repository of observed data is imported, it can be manipulated by adding new data points, numerically changing data points or changing metadata. Changes are reversible through ![](../assets/icons/Undo.svg) and will be tracked in the project history. Numerically changing a value is reflected in real-time in the preview graph below and will result in moving the data point in the data grid to the new settings.

The editing window can be accessed by double-clicking the observed data in the building block view or through the context menu.

{% hint style="note" %}
All values in the time column must be unique in an observed data repository.
{% endhint %}

{% hint style="tip" %}
**Editing All Meta Data**
Using the context menu of the **Observed Data** folders, the metadata values can be accessed and changed. This is very useful to supplement metadata or to re-organize data. Changes will be applied to all data tables in that folder.
{% endhint %}

## Update Observed data

Using the context menu on a single data set, the user can update **all data sets which were imported together with the selected one**. 

![Update previously imported data sets](../assets/images/part-5/Import-UpdateDataSets.PNG)

Upon selecting this option, the user is prompted to select the file from where the data will be re-imported (This can also be the same file used for the original import, just with edited data.) A window appears, showing the changes this re-import would make to the observed data: which data sets will be deleted, which will be overwritten and which will be newly imported. The user can then decide to proceed with the reload or abort it.

![Reload summary](../assets/images/part-5/ImporterReloadSummary.png)

{% hint style="note" %}
Reloading previously imported data will always update **all** data sets which belong to the same import process. This also means that data sets which are not available in the new data source anymore will be automatically deleted from the project. If this is not possible (for example because a data set is used in a parameter identification or in a simulation) - the update is not possible and the user is prompted to remove such a data set from all simulations/parameter identifications/... **manually**. 
After that, the update process can be started again.
{% endhint %}
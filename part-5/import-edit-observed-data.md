# Shared Tools - Import and Edit of Observed Data

A generic tool for handling of observed data within the Open Systems Pharmacology Suite is the formerly known PKExcelImporter. It is used in both applications (PK-Sim® and MoBi®) for importing observed data from e.g. Microsoft Excel® or .csv files with following prerequisites:

1.  A file contains one or several sheets with data tables.

2.  Column headers are in the first non-empty row.


**File Selection Dialog**

To import data you should do the following:

1.  Select the input file (see [File Selection](#file-selection)).

2.  Specify the column mapping (see [Column Mapping in Import of Observed Data](#column-mapping-in-import-of-observed-data)) and enter all required meta data and set unit information.

3.  You can continue importing data sheets/data files by adding or changing the column mapping or selecting another data sheet. Upon editing the column mapping the data are re-interpreted und updated automatically. The configured mapping remains the same for a whole import process, meaning that all the imported sheets will be using the same mapping. If you want to import data with different mappings, you have to do this in seperate imports.

4.  Complete the transfer of the imported data sheets to the calling application by confirming your settings.

## File Selection‌

To import a new set of data from an excel file, click on the **Add observed Data** button, in the context menu of the observed data, to start the import component and specify the the excel file to be imported.

![File Selection Dialog](../assets/images/part-5/FileSelectionDialog.png)

The input file must comply with the allowed formats(TO BE SPECIFIED). If even one sheet does not comply to any of the allowed formats, then the file is considered invalid and cannot be imported. The import process is stopped. 

{% hint style="warning" %}
The first step of importing is to select the file from which to import. Both excel file formats (xls and xlsx) as well as .csfv files are supported and it is **not** required to have Microsoft Excel® installed on your computer.
{% endhint %}
  
{% hint style="tip" %}
By switching the file type combo box value it is possible to import a comma separated values file (csv). For csv files, the used separator is determined automatically. Supported separators are semicolon, comma, tabulator, period or colon. Values can be enclosed in quotes.
{% endhint %}


## Preview of imported and original data‌

After selection of the file to be imported, a split window appears (see screenshot below). The right hand side shows a preview of the imported data file, each tab representing one sheet. 

![Importer Window](../assets/images/part-5/ImporterInitialWindow.png")

Every tab is closeable. Additionally, using the right click on the tab names, a context menu appears where the user can close a specified group of tabs. Data coming from closed sheets is not imported or taken into account in the cofniguration in any way.

![Importer Sheet Context Menu](../assets/images/part-5/ImporterSheetContextMenu.png")


The data preview table offers various possibilities of filtering and sorting of the data. One can use the filter symbol on a column of the data to open the filter menu (see screenshot underneath). Also by right clicking the column name the user can sort the data according to a specific column or also open the filter editor to create more complicated filters.

![Importer Data Table Column Filter](../assets/images/part-5/ImporterTableColumnFilter.png")

![Importer Filter Editor](../assets/images/part-5/ImporterFilterEditor.png")



The defined filters changes the viewing of the data. The user can choose to restrict the filters only to the viewing of the data or import only the filtered data by checking the checkbox "Use the filters for importing the data" under the data preview table.  

On the top-right part of the window one can see the path of the selected excel source file and also use the "..." button to select a new file. Selecting a new file though will cause the mapping and loaded sheets to be reset and the work you have done on the current input file will be lost.


## The preview panel

The user has the option to close one or more tabs thus preventing the viewing and importing of specific sheets of the excel file. On top of that one can use filters (TO ADD SMALL DESCRIPTION AND ALSO SXREENSHOTS) on the data. The user can then choose whether the filtes used in viewing the data should also be applied in the import of them, by checking the corresponding checkbox ("Use the filters for importing the data"). There are two buttons - one for loading the current sheet that the user is viewing and the other to load all currently open sheets of the file. 




## The mapping part of the window

The left hand side window displays the mapping of imported column identifiers with the predefined data types. The initial mapping is performed automatically upon selection of file and identification of the format, but can be overridden by adjusting the controls. 


## The NaN indicator

There exists the possibility that a specific number (eg 99999) is being used in the data as an equivalent of NaN. In this case the menu on the left bottom of the window gives the user the possibility to configure the importer's response to such values. On the input field "NaN indicator" the user can specify the value that should be identified as NaN. This value has to be a **numeric** value - it cannot be ab alphanumeric string. Next the dropdown menu underneath specifies if the user wants to ignore the whole row where the NaN value is situated ("Ignore the row"), or if upon finding a NaN value in the data that is to be imported the user wants to prevent the import with an error. In the second case ("Prevent the import") , if a NaN value is found, when clicking "Load sheet" there will be a pop -up that will inform the user of the existence of a NaN value, prompting him to clean up his data and preventing him from importing. 

## Saving the configuration

By clicking this button the user can save the settings that he has configured to an xml file. This configuration includes the mapping, the NaN indicator and its preferences, the selected sheets, the path to the selected file and all the other information that can be configured in the importer. 
The saved configuration can then be used to either save and later resume the configuring and importing of a file or to import a different file that should be imported with exactly the same configuration.
If some sheets have already been loaded, this state is also part of the configuration. 






## Confirmation Tab

When at least one sheet has been successfully loaded, the confirmation tab becomes also present in the importer. This is the tab where the user can preview the data sets that will be imported in Pk-Sim if the import is to be finalized b clicking the "Import" button. Both a table and a chart view are available. To the left, the user can use the existing keys and combine them with a seperator or/and hardcoded text (EXPLAIN A BIT FURTHER) to create naming patterns for the observed data that will be imported. 


## the mapping panel

The mapping panel is available throughout the import process. If the user cahnges the mapping, the changes are automatically applied and the result of the modifed mapping is automatically updated. Likewise, if the updated mapping would lead to an error because it would not pass validation, the result of modifying the mapping is a validation error.

As shown in the screenshot underneath, the user gets a view of all the available mappings and can map a an excel column to them. A column can be selected to a mapping only once, so when an excel column is selected for a specific mapping it automatically becomes no longer available on the drop down menus for other mappings. There is only one exception to this rule: the unit column for the measurement can also be mapped as the unit column for the corresponding error. 

![Importer Selecting an Excel Column](../assets/images/part-5/ImporterSelectingExcelColumn.png")


There are some mappings that are mandatory. The minimum set of them is that a Time and a Measurement mapping are defined. 

A column can be selected to a mapping only once, so when an excel column is selected for a specific mapping it automatically becomes no longer available on the drop down menus for other mappings. There is only one exception to this rule: the unit column for the measurement can also be mapped as the unit column for the corresponding error. 

## Selection of units

The units for the mapped columns can either be a specified value or come from a column. When the units come from a column each data point can have a distinct unit. In the unit dialog, there is a toggle to select which mode of unit definition the user wants. When being set to a specified value, if this value is also specified as part of the header name  (eg Time[h]) is automatically recognized by the importer. The user can edit the unit (when a unit is available) by opening the dialog in the column "Edit extra fields" of the corresponding mapping row.

![Setting the units manually](../assets/images/part-5/ImporterSetUnits.png")


![Setting the units from a column](../assets/images/part-5/ImporterSelectUnitFromColumn.png")

## LLOQ

The Lloq can either come from the column of the measurement excel column or from a seperate column. In the first case the Lloq values in the measurement column must be preceded by a "<", e.g. "<0.2", where 0.2 is the LLOQ value.


## Configuring the error

The error can be set to Standard arithmetic Deviation or Geometric Deviation. In the case of geometric deviation, the error is dimensionless, thus there is no possibility to select a unit. Otherwise, the user can select the unit either manually or from a column.
The units of the error have to be consistent with the units of the corresponding measurement. So if the unit of the measurement come from a column, then the units of the error also have to come from a column. 


![Selecting Error Type](../assets/images/part-5/ImporterSlectingErrorType.png")

When trying to load a sheet and the error and measurement unit come from a column, they are checked for consistency. If the data in the excel columns are of different dimensions, the data cannot be imoprted.


## Confirmation Tab

When at least one dataset has been imported, the confirmation tab gets activated. 


![Confirmation Tab](../assets/images/part-5/ImporterConfirmationTab.png")


There the user can see what datasets have already been loaded. On selecting a data set the data are being previewed to the right, both as values and in a chart form. The naming with which the data will be imported can be specified in the left side of the panel. This can either be done by manually typing in the "Naming Pattern" input box or by selecting a mapping, then a seperator and then cllicking the "Add Keys" button. 
















## Completing the Import of Observed Data‌

A new tab page is created for each imported data file and you can enter meta data for tables or columns, set unit information or just view the imported data (see Imported Table Tab Page Screenshot). Changes to the error type or to units can be made in this view and are directly reflected in the chart.

![Imported Table Tab Page](../assets/images/part-5/ImportTableTabPage.png)

On the left hand side you can see all meta data of the currently selected table and their columns. You can enter the requested information directly into this area or select ![Image](../assets/icons/IconMetaData.png) **Edit Meta Data** from the context menu of a column header.

To set a unit for a column of an imported table you can select ![Image](../assets/icons/IconUnitInformation.png) **Set Unit** from the context menu of a column header.

To complete the import of data tables to the calling application press the **OK** button.

{% hint style="warning" %}
Missing User Input
All required meta data and units need to be defined before finalizing the import. Each table in which meta data and/or unit information is missing, is labelled by a ![Image](../assets/icons/IconMissingData.png) icon preceding the table name. Use the page select button ![Image](../assets/icons/PageSelectorButton.png) to get a list of all tables and identify those with missing information.
{% endhint %}
  
{% hint style="tip" %}
Deselecting Tables
You can deselect an imported table from being transferred by closing its tab (clicking the ![Image](../assets/icons/CloseTabPageButton.png) button).
{% endhint %}
  
{% hint style="tip" %}
Collect From Different Sources
Before you transfer the imported tables to the calling application (and complete the import), you are free to go back to the source page and continue selecting more tables for import even from different source files.
{% endhint %}
  
{% hint style="note" %}
The PKExcelImporter component determines the data type of a column by the first data rows. If there are values in the following rows that cannot be converted into the determined data type, those rows are skipped. If this results in an empty imported table, this table is deleted straight away and cannot be transferred.
{% endhint %}



!!!!!! THIS HERE ACTUALLY REMAINS THE SAME

## Editing Observed Data‌

Once a repository of observed data is imported, it can be manipulated by adding new data points, numerically changing data points or changing meta data. Changes are reversible through <img width="32" src="../assets/icons/Undo.ico"> and will be tracked in the project history. Numerically changing a value is reflected in real time in the preview graph below and will result in moving the data point in the data grid to the new settings

The new editing window can be accessed through double clicking the observed data in the building block view or through the context menu.

{% hint style="note" %}
All values in the time column must be unique in a data repository.
{% endhint %}

{% hint style="tip" %}
**Editing All Meta Data**
Using the context menu of the **Observed Data** folders, the meta data values can be accessed and changed. This is very useful to supplement meta data or in reorganizing data. Changes will be applied to all data tables in that folder.
{% endhint %}
# Formulations

In the building block **Formulation** the properties of the dosage form that is administered can be defined. Most of the predefined formulations are related to formulations typically administered via the oral route, whereas others, such as the **Zero Order** and the **First Order** release functions, can technically be administered into any other compartment. Please note that not all combinations of formulations and administration routes are possible. For an intravenous administration (bolus and infusion), formulation is not required as a drug administered intravenously is assumed to be dissolved in a medium.

## Definition of new Formulations in PK- Sim®

To create a new formulation, do one of the following:

* Click on <img src="../assets/icons/Formulation.svg" alt="" data-size="line"> **Formulation** in the **Create** Group of the **Modeling** Tab, or
* Right mouse click on **Formulations** in the **Building Block Explorer** and select **Add Formulation...**, or
* Use the short cut **Ctrl+Alt+F**.

A dialog will open where the properties of the formulation can be defined.

The formulation is initialized by giving it a **Name** in the respective input field. The name is used to identify the formulation when its parameters are saved in the project and/or as a template. The name is also used for identification of the formulation in the simulation.

For the different types of empirical or user-defined release functions, the dissolution curve will be depicted in the adjacent graph as fraction of dose dissolved _vs._ time.

For **Particle Dissolution**, the dissolution function represents the result of the mechanistic dissolution model of the Noyes- Whitney type in combination with the physiological conditions, rather than an input function. Thus, the dissolution properties do not only change as a function of the physico-chemical properties of the drug and the formulation characteristic, but also with the physiological conditions of the individual or animal. The resulting fraction dissolved as a function of time within the intestinal segments represents a simulation output that can be displayed in the **Results Window** of the simulation (see [Shared Tools - Chart Component](../part-5/chart-component.md)).

From the drop-down menu you can choose from the following predefined formulations:

* Dissolved
* Weibull
* Lint80
* Particle Dissolution
* Table
* Zero Order
* First Order

In the following sections, the different formulation types are described in more detail.

### Dissolved

Using this type of formulation the drug is assumed to be administered in solution. Therefore, the whole amount of drug becomes available for absorption directly after the administration.

{% hint style="info" %}
The formulation type **Dissolved** characterizes the drug as being in solution at the point of administration. However, in case of poorly soluble compounds the intestinal absorption may be limited by the solubility, with the solubility (or in case of ionizable compounds the local pH-dependent GI solubility calculated using to the Henderson-Hasselbalch equation), imposing an upper bound to the absorption rate.
{% endhint %}

### Weibull

The Weibull function can be used to empirically (i.e., not mechanistically) describe the dissolution behavior of various dosage forms. The Weibull function can fit almost any kind of dissolution curve and is often used to describe experimental data when the mechanism of the release is not known [[7](../references.md#7)] [[30](../references.md#30)].

When applied to drug dissolution and release from pharmaceutical dosage forms, the Weibull function expresses the accumulated fraction of the drug $$m$$ in solution at a time $$t$$ according to the following equation [[40](../references.md#40)]:

$$m=1-\exp(\frac{-(t-T_{lag})^b}{a})$$

where $$a$$ is the scale parameter, defining the time scale of the process, $$T_{lag}$$ the lag time before the onset of the dissolution or the release process, and $$b$$ the shape parameter characterizing the curve as either exponential ($$b = 1$$), sigmoid ($$b > 1$$), or parabolic ($$b < 1$$).

The following parameters have to be defined when choosing the Weibull function:

- **Dissolution shape** $$b$$ characterizing the curve as either exponential ($$b = 1$$), sigmoid ($$b > 1$$), or parabolic ($$b < 1$$).
- **Dissolution time (50% dissolved)** defining the time (excluding the lag time) at which 50% of the administered dose is dissolved and, thus, corresponding to the scale parameter $$a$$ of the Weibull function.
- **Lag time** $$T_{lag}$$ characterizing the time after which dissolution begins.
- **Use as suspension**: if selected, the formulation will disintegrate in the stomach and the disintegrated particles will migrate along the gastrointestinal tract compartments. Particle dissolution formulation is always treated as a suspension per construction. If, on the other side, this option is not selected, the tablet will be treated as non-disintegrating tablet with discrete transition in the different intestinal compartments.

Please note that the Weibull function can only be combined with the Administration type **Oral**.

### Lint80

The **Lint80** is an empirical function assuming linear release until 80% of the administered dose is dissolved. This type of formulation can only be combined with the Administration type **Oral**.

The following parameters have to be defined when choosing the **Lint80** function:

* **Dissolution time (80% dissolved)**, defining the time (excluding the lag time) when 80% of the administered dose is dissolved.
* **Lag time** characterizing the time after which dissolution starts.
- **Use as suspension**: if selected, the formulation will disintegrate in the stomach and the disintegrated particles will migrate along the gastrointestinal tract compartments. Particle dissolution formulation is always treated as a suspension per construction. If, on the other side, this option is not selected, the tablet will be treated as non-disintegrating tablet with discrete transition in the different intestinal compartments.

### Particle Dissolution

Particle Dissolution calculates the dissolution kinetics of spherical particles with a predefined particle size distribution based on the Noyes-Whitney approach. The details of the mechanistic dissolution model have been described by Willmann et al [[102](../references.md#102)]. In PK-Sim®, the particle dissolution can only be combined with the Administration type **Oral**. To simulate the particle size dependent dissolution, the following formulation-dependent parameters have to be defined:

- **Thickness (unstirred water layer)** - thickness of the diffusion layer.
- **Type of particle size distribution** - monodisperse or polydisperse.
- **Particle radius (mean)**.

For the **polydisperse** type of particle size distribution, the following additional parameters can be defined:

- **Particle size distribution**:  either normal or log normal.
- **Particle radius (min)**: the lower limit for the particle radius.
- **Particle radius (max)**:  the upper limit for the particle radius.
- **Number of bins**.

For **normal** distribution:

- **Particle radius (mean)**
- **Particle radius (SD)**: Standard deviation of the particle radius.

For **log normal** distribution:

- **Particle radius (geomean)**.
- **Coefficient of variation**.

In addition, in order to use the Particle Dissolution formulation, the drug-related parameters have to be defined in the **Advanced Parameters** tab of the **Compound Building Block**. These include:

- **Aqueous diffusion coefficient**.
- **Density of the drug** material, and the threshold for immediate dissolution. Further, you will have to indicate how the precipitated amount should be treated (either as soluble or insoluble).

#### Diffusion layer thickness

The thickness of the diffusion layer around a particle can be described with one of three alternative approaches, which are selected per formulation:

- **Hintz-Johnson** (parameter **Use Hintz-Johnson**): the diffusion layer thickness is equal to the radius of the particle and thus decreases while the particle dissolves. It is limited by **Thickness (unstirred water layer)** as maximum value.
- **Hydrodynamic model** (parameter **Use Hydrodynamic Model**): the diffusion layer thickness is calculated dynamically from the velocity and the viscosity of the luminal fluid, using the Ranz-Marshall correlation between the Sherwood, the Reynolds, and the Schmidt number [[175](../references.md#175)].
- **Constant** (in case the options above are deactivated): the diffusion layer thickness is constant and given by the parameter **Thickness (unstirred water layer)**.

With **Use Effective Diffusion**, the drug bound to bile salt micelles is transported through the diffusion layer in parallel to the free drug, which requires the compound parameters described in [Advanced intestinal solubility](pk-sim-compounds-definition-and-work-flow.md#advanced-intestinal-solubility).

### Table

Table defines the amount of drug applied per unit time as a continuous function. You can either manually specify time and fraction of the applied dose values or import dissolution data from Excel®.

In order to manually enter the values:

* Click on **Add Point** ![Image](../assets/icons/Add.png) to add a new row to the table
* Enter appropriate values for **Time** and **Fraction (dose)** dissolved

{% hint style="info" %}
The origin (0, 0) is always present. Values must be monotonically increasing in the **Time** column. The resulting function will be represented in the adjacent graphic. The absolute dose will be taken from the respective **Administration Protocol Building Block** that will later be used in the simulation.
{% endhint %}

In order to **import** experimental dissolution data from Excel®:

1. Click <img src="../assets/icons/LoadAction.svg" alt="" data-size="line"> **Import Formulation**
2. Select and open the Excel® file
3. Import and transfer the appropriate Excel® sheet

{% hint style="info" %}
For additional information about the import data and mapping workflow see [Import and Edit of Observed Data](../part-5/import-edit-observed-data.md).
{% endhint %}

- **Use as suspension**: if selected, the formulation will disintegrate in the stomach and the disintegrated particles will migrate along the gastrointestinal tract compartments. Particle dissolution formulation is always treated as a suspension per construction. If, on the other side, this option is not selected, the tablet will be treated as non-disintegrating tablet with discrete transition in the different intestinal compartments.

### Zero Order

Zero Order defines the application at a constant rate. The total dose (defined in the administration protocol) will be administered at a constant rate until within the specified time [Start of administration, Start of administration + **(End time)**].

### First Order

First Order defines the application as a first order input. The required input is the half-life of application value **(t1/2)**. The formulation release is then described by the following equation:

$$\frac{dA}{dt}=-k\cdot A$$

where $$A$$ is the amount of drug at time $$t$$ and $$k$$ the first order rate constant calculated from the half-life of application value according to:

$$k=\frac{\ln(2)}{t_{1/2}}$$

## Setting or Changing Formulation Properties

To set or change the properties of an existing formulation:

1. Right mouse click on the respective formulation in the **Building Blocks Explorer**
2. Select <img src="../assets/icons/Edit.svg" alt="" data-size="line"> **Edit...**

or simply double click on the formulation in the **Building Blocks Explorer**

The window with the properties of the formulation will open. The properties can be set or changed appropriately. The changes are saved by closing the window by clicking on ![Image](../assets/icons/CloseWindow.png).

## Cloning Formulations

To clone a formulation in the project:

1. Right mouse click on the respective formulation in the **Building Blocks Explorer**
2. Select <img src="../assets/icons/SimulationClone.svg" alt="" data-size="line"> **Clone...**
3. Set an alternative name for the formulation clone and enter a description, if desired.
4. Confirm and close the window by clicking **OK** <img src="../assets/icons/OK.svg" alt="" data-size="line">.

## Formulations as Templates

For each project, a number of formulations can be defined. They can be saved as a template and then be shared among several projects and users.

To **save** an existing formulation as template:

1. Right mouse click on the respective formulation in the **Building Block Explorer**
2. Select <img src="../assets/icons/SaveAction.svg" alt="" data-size="line"> **Save as Template...**

In case a formulation with the same name already exists, a warning appears and you have the following opportunities:

* Override: This action will override the existing template.
* Save as: You can save the formulation under a different name. In this case, you will be asked to Rename the new template.
* Cancel: This action will abort the saving process.

To **load** an existing formulation from the template database:

1. Right mouse click on **Formulations** in the **Building Blocks Explorer**
2. Select <img src="../assets/icons/LoadAction.svg" alt="" data-size="line"> **Load From Template...**
3. Select the desired formulation from the user templates

In case a formulation with the same name already exists in the project, a warning appears and you will have to **Rename** the formulation that is to be loaded from template.

1. Click **OK** <img src="../assets/icons/OK.svg" alt="" data-size="line">

The selected formulation will appear in the **Building Blocks Explorer** view.

In addition, formulations can be directly loaded from the template database within a simulation (see [Simulations](pk-sim-simulations.md)).

## Deleting Formulations

To delete a formulation from the project:

1. Right mouse click on the respective formulation in the **Building Blocks Explorer**
2. Select <img src="../assets/icons/Delete.svg" alt="" data-size="line"> **Delete...**
3. Confirm to by clicking **Yes**

{% hint style="warning" %}
Please note that a formulation that is used in any simulation of the project cannot be deleted.
{% endhint %}

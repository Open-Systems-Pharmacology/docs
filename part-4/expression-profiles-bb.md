# Expression Profiles Building Blocks

The **Expression Profile** building blocks (BB) contain the information about the expression and localization of the proteins. An expression profile is a list of parameter paths and values that define the expression of a protein, and the initial conditions of proteins molecule in different compartments.

When importing a PBPK model from PK-Sim, a new expression profile BB is created for each protein defined in the PK-Sim model.

In contrast to the other BB types, Expression Profiles BBs are not part of a module, but stored in a separate folder in the MoBi project explorer. They can be used in combination with any module of the project. If the module does not contain the protein defined in the expression profile, the expression profile will have no effect on the simulation.

## Expression Profiles - Functionality Overview

Upon opening an expression profile BB, the editor shows three tabs:

- **Parameter**: Lists all parameter values defined in the expression profile. These are typically the expression levels of the protein in different organs or tissues.

- **Initial Conditions**: Lists all initial conditions defined in the expression profile. For functionality overview, see the documentation of the [Initial Conditions BB](initial-conditions-bb.md).

- **Formulas**: Lists all formulas used in the expression profile (for parameter values and initial conditions).

Values can be edited by the user, but no new entries can be added or existing entries removed. To add expression of a protein to a new structure (e.g., a new organ), you need to create a Parameter Values BB and an Initial Conditions BB in an extension module and add the new entries there.

An expression profile can be saved as pkml and loaded as a parameter values or an initial conditions BB in an Extension module.

An expression profile can be exported to Excel. Two sheets will be created - one for parameter values, one for initial conditions. Only values that are defined by a constant value are exported.

## Creating New Expression Profiles

New expression profiles can be created in MoBi with the access to the gene expression DB. Right-click on the **Expression Profiles** folder in the MoBi project explorer and select **Add Expression Profile**. Using the **Database Query** button in the "Parameters" tab of the editor, you can search expression profile information contained in the gene expression database. The process is described in detail in the [Gene Expression Database](../part-3/pk-sim-expression-profile.md) documentation.
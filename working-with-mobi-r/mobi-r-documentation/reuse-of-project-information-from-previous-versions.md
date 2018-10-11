# Reuse of Project Information from Previous Versions

## Reuse of MoBi® 2 projects in MoBi® 3‌

{% hint style="warning" %}
MoBi® 3 has a completely different model structure than all previous versions. Therefore, MoBi®3 is not able to completely import MoBi® 2 files, but rather allows for loading of certain information from MoBi® 2 projects into new projects.
{% endhint %}

In MoBi®3.5, projects can either use amount-based or concentration-based reaction rates. If a MoBi®2 project is using concentration-based reaction rates and is imported into a MoBi® 3 project that is also using concentration-based reaction rates, no conversion is needed. However, if a MoBi®2 project is using concentration-based reaction rates and is imported into a MoBi® 3 project that is using amount-based concentration rates, all values will be converted based on the volume of the relevant container.

This conversion is invisible to the user and based on the following algorithm: In the container with the volume V, the compound has a concentration C=A/V, where A is the amount of the compound. If the concentration-based rate is R\_C and the corresponding amount-based rate is R\_A, then:

dC/dt=R\_C and dA/dt=R\_A, R\_A=d\(V\*C\)/dt=C\*dV/dt+V\*dC/dt=C\*dV/dT+V\*R\_C.

* If the volume is time-independent, then dV/dt=0 and the conversion between amount-based rates and reaction-based rates is done by just multiplying with the volume V of the container: R\_A=V\*R\_C.
* If the volume is time-dependent, then dV/dt must be given by the user using a right hand side formula \(RHS\) \(V\_rhs\) and R\_A=C\*V\_rhs+V\*R\_C.
* If none of this applies, dV/dt is assumed to be small and ignored Proceed in the following way to import information from MoBi®2 files:
* Open the target project or create a new project
* Go to **Utilities**, click **Load Information from MoBi 2 project**
* Select the desired MoBi®2 project

You will be guided by a wizard to import data of the old project to the new one.

It is possible to load information on molecule properties, reaction networks and molecule default start values from your old MoBi®2 project into the new MoBi®3 project. The following functions will all be executed during this process:

| Function | Remarks |
| :--- | :--- |
| Import of Parameters used in Molecules and Reactions | In MoBi 3.5® a new logic for the import of parameters is established.  If a parameter is used in a molecule start concentration formula \(regardless of if it is also used in a reaction\) and is unique for just one molecule, it is added to that molecule's parameters upon import. If a parameter is used for several molecules, it is added to the molecule with the shortest name upon import. If the same is not unique, it is added to the molecule with the shortest name and in alphbetical order.  If a parameter is used only in reactions and in only one reaction, it is added to that reaction's parameters upon import. If it is used in more than one reaction, it is added to the reaction with the shortest name and in alphabetical order. |
| Import Molecules | Every species in MoBi®2 is converted to a MoBi®3 molecule. For each molecule a concentration parameter is added with a formula as used in PK-Sim 5®. If a species in your MoBi®2 project is defined as a compound, all compound parameters are added to the corresponding molecule. If only a single start value/formula is used for the species, it is converted to the default amount, otherwise the user is asked to select one. Compound species are set to non-stationary by default. Boundary species are changed to non-boundary type species. |
| Import Reactions | Every old reaction is converted into a new one. The species references are replaced with molecule/concentration references. The user is asked if links between models should be converted to reactions. If reactions with the same name, but different kinetics are used in your MoBi®2 project, only one reaction can be used which has to be decided by the user. Boundary species are imported with a stoichiometric coefficient of 0; additionally, a warning is given. |
| Import Molecule Start Values | Molecule Start Values are imported with a scale divisor. Default scale divisor is 1. |
| Import Simulation Settings | Simulation settings will be imported into a building block at the project simulation level. |
| Import Spatial Structure | THIS IS NOT A REAL SPATIAL STRUCTURE CONVERSION. It is recommended only for importing spatial structures with one single compartment, as passive transports between compartments cannot be imported. Containers and parameters may be moved to reactions or molecules. The simulation parameters \(e.g., solver and time parameters\) are not converted. Interaction links between models are converted to neighborhoods, their parameters are stored in the neighborhood structure. |

{% hint style="info" %}
Values are converted to the project display unit defined in the new project so that the numerical values might change.
{% endhint %}

## Conversion of MoBi® 3.1 projects in MoBi® 3.2‌

Projects created with MoBi® 3.1 are automatically converted to the MoBi® 3.2 format when opened.

In MoBi® 3.1 in some cases it was necessary to insert manual conversion factors into formulas, if dimensions with inconsistent base units were used. In the current version such conversion factors are not longer necessary.

{% hint style="warning" %}
If you have inserted such manual conversion factors, you have to eliminate those factors and to rebuild the simulations to get proper simulation results. Please perform the following steps to identify and remove manual conversion factors and to rebuild the simulations.
{% endhint %}

1. Open the project stored from MoBi® 3.1 with MoBi® 3.2.
2. Open the Notifications view, which is autohidden at the bottom by default.
3. Double click each row with message "Dimension check warning".

   The corresponding formula is opened. Remove any manual conversion factors \(mostly powers of 10\), if available. Do not remove other factors.

4. Rebuild each simulation of interest, i.e. build a new simulation with the same building blocks and use the same simulation settings and modifications as in the corresponding old simulation.
5. Run each new simulation and compare the results. In case of differences check the formulas with "Dimension check warning" again. In case you have to adjust a formula rebuild the simulation again. Otherwise compare carefully the used building blocks, simulation settings and simulation parameter modifications. If you still get different results, please contact our support \(\(mailto:support@systems-biology.com\)[support@systems-biology.com](mailto:support@systems-biology.com)\).
6. If you successfully managed to rebuild the simulations with the same results, remove the old simulations from the project. \(Due to the conversion factors still contained in those simulations you would produce wrong results running the old simulations with the new version of MoBi.\)


# Open Systems Pharmacology Suite - Fact Sheet

### Main modeling and simulation features:

  - PBPK modeling of small molecules and biologics

  - Species Extrapolation / First in Human dose prediction

  - Parent-Metabolite Studies / Drug-Drug-Interaction

  - Pediatric Study Design – PIP/PDP support

  - Special Populations: Hepatic/Renal impairment / Obese / Elderly /
    (Pre)term neonates / Children / Pregnant women / more

  - Formulations / Meal effects

  - PBPK/PD, QSP as well as pathway, network and disease modeling

  - … (TODO) to be continued

<table>
<tbody>
<tr class="odd">
<td colspan="2" align="center"><b>Model building blocks</b></td>
</tr>
<tr class="even">
<td style="vertical-align:top"><p>Organisms</p></td>
<td><p>pre-parameterized whole-body PBPK models including detailed integrated GI tract for</p>
<ul>
<li><p>human</p></li>
<li><p>monkey</p></li>
<li><p>dog (beagle and mongrale)</p></li>
<li><p>minipig</p></li>
<li><p>rat</p></li>
<li><p>mouse</p></li>
<li><p>rabbit</p></li>
</ul>
<p>with full flexibility for parameterization of (anthropo)metrics, anatomical and physiological properties, protein expression levels ETC.</p>
<p>Most important organs included. For each organ:</p>
<ul>
<li><p>metabolizing pathways</p></li>
<li><p>different active transporter types(influx, efflux, Pgp-like)</p></li>
</ul>
<p>Biliary tract included, enables enterohepatic cycling</p>
<ul>
<li><p>Scaling of individuals</p></li>
</ul>
<p style="padding-left: 2em;"> Scaling can be used to change the biometrics of an existing individual, i.e. an adult model may be scaled to an infant model while maintaining/scaling all specific modifications </p>
<ul>
</ul></td>
</tr>
<tr class="odd">
<td style="vertical-align:top"><p>Populations</p></td>
<td><p>database for population simulations with distributions of anatomical and physiological parameters for</p>
<ul>
<li><p>European Caucasians (ICRP, 2002)</p></li>
<li><p>US Caucasian (NHANES, 1997)</p></li>
<li><p>US Asians (NHANES, 1997)</p></li>
<li><p>US Africans (NHANES, 1997)</p></li>
<li><p>Asian (Tanaka, 1996)</p></li>
<li><p>Japanese (2015)</p></li>
<li><p>Preterms (2015)</p></li>
<li><p>Pregnant (Dallmann et al. 2017) (*)</p></li>
</ul></td>
</tr>
<tr class="even">
<td style="vertical-align:top"><p>Protein expression</p></td>
<td><p>The PK-Sim® library includes large-scale gene-expression data from publicly available sources which were downloaded, processed, stored and customized such that they can be directly utilized in PBPK model building. Public database which were imported are</p>
<ul>
<li><p>whole genome expression arrays from ArrayExpress (European Informatics Institute, 2010, http://www.ebi.ac.uk/microarray-as/ae/)</p></li>
</ul>
<ul>
<li><p>RT-PCR derived gene expression (Nishimura et al., 2003; Nishimura and Naito, 2005, 2006)</p></li>
<li><p>expressed sequence tags (EST) from UniGene (National Center for Biotechnology Information, 2010, http://www.ncbi.nlm.nih.gov/unigene).</p></li>
</ul></td>
</tr>
<tr class="odd">
<td style="vertical-align:top"><p>Compounds</p></td>
<td><p>Full ADME characterization of drugs including</p>
<ul>
<li><p>molecular weight</p></li>
<li><p>lipophilicity</p></li>
<li><p>protein binding</p></li>
<li><p>acid/base pKa</p></li>
<li><p>solubility</p></li>
<li><p>intestinal permeability</p></li>
<li><p>specific protein binding kinetics</p></li>
<li><p>enzyme specific metabolization kinetics</p></li>
<li><p>transporter specific transport kinetics</p></li>
<li><p>inhibition and induction parameters</p></li>
</ul>
<p>and for large therapeutic molecules (e.g. antibodies)</p>
<ul>
<li><p>solute radius (calculated for molecular weight as per default)</p></li>
<li><p>dissociation constant for binding to FcRn</p></li>
</ul>
  <br>
<p>Including a set of pre-parameterized standard compounds</p></td>
</tr>
<tr class="even">
<td style="vertical-align:top"><p>Partition Coefficients</p></td>
<td><p>prediction models for tissue partition coefficients</p>
<ul>
<li><p>PK-Sim 2003</p></li>
<li><p>Rodgers &amp; Rowland</p></li>
<li><p>Schmitt</p></li>
<li><p>Poulin &amp; Theil</p></li>
<li><p>Berezhkovsky</p></li>
</ul></td>
</tr>
<tr class="odd">
<td>Permeability</td>
<td>prediction models for cellular permeabilities and intestinal permeability</td>
</tr>
<tr class="even">
<td style="vertical-align:top"><p>Formulations</p></td>
<td><ul>
<li><p>Dissolved</p></li>
<li><p>Particles</p></li>
<li><p>Weibull</p></li>
<li><p>Lint80</p></li>
<li><p>Table</p></li>
<li><p>1st order</p></li>
<li><p>Zero order</p></li>
</ul></td>
</tr>
<tr class="odd">
<td style="vertical-align:top"><p>Administration protocols</p></td>
<td><p>Administration routes:</p>
<ul>
<li><p>IV (Bolus and Infusion)</p></li>
<li><p>Oral</p></li>
<li><p>User defined (free choice of target organ/compartment)</p></li>
</ul>
<p>Administration Schemes:</p>
<ul>
<li><p>Single</p></li>
<li><p>once daily, bi-daily, …</p></li>
<li><p>complex (multi-)periodic schemes</p></li>
<p><img src="assets/images/part-3/PKSim_Protocol_AdvancedEx.png" /></p>
</ul>
</td>
</tr>
<tr class="even">
<td>Events</td>
<td><ul>
<li><p>Meals</p></li>
<li><p>Gallbladder emptying</p></li>
</ul></td>
</tr>
<tr class="odd">
<td colspan="2" align="center"><b>Modeling tools</b></td>
</tr>
<tr class="even">
<td style="vertical-align:top"><p>Parameter identification (PI)</p></td>
<td><p>A fully integrated PI Toolbox provides a straightforward means to adjust key model parameters automatically within user-defined ranges. It is possible to optimize multiple simulations, for example with different dose levels, and multiple observed data sets, simultaneously. A clear visualization of the optimization process and of the optimization results gives you full control and direct feedback whether the identification process was successful.</p>
<p><img src="assets/images/factsheet/image001.png" /></p>
<p><img src="assets/images/factsheet/image003.png"  /></p>
<p><img src="assets/images/factsheet/image005.png" /></p>
<p><img src="assets/images/factsheet/image007.png" /></p>
<ul>
<li><p>Simultaneous optimization of multiple simulations</p></li>
<li><p>Simultaneous optimization of multiple observed data sets</p></li>
<li><p>LLOQ (Lower Limit of Quantification) values are taken into account</p></li>
<li><p>Linking of multiple simulation parameters to one identification parameter (as absolute value or as a factor)</p></li>
<li><p>Lin/Log scaling of identification parameters</p></li>
<li><p>Lin/Log scaling of residuals</p></li>
<li><p>Multiple optimizations with randomized start values</p></li>
<li><p>Combining parameter identification with optimization for best suited partition coefficients/permeability methods</p></li>
<li><p>Available optimization algorithms: </p></li>
</ul>
<ul>
<li><p>Nelder-Mead</p></li>
<li><p>Levenberg-Marquardt</p></li>
<li><p>Monte-Carlo</p></li>
</ul>
<ul>
<li><p>Visual feedback during optimization</p>
<ul>
<li><p>Time profile</p></li>
<li><p>Predicted vs. Observed</p></li>
<li><p>Error history: Total error vs number of evaluations</p></li>
<li><p>Total error: current/best value</p></li>
<li><p>Identification parameters: current/best value</p></li>
<li><p>Export of parameters history to MS-Excel</p></li>
</ul></li>
<li><p>Visualization of optimization results</p>
<ul>
<li><p>Time profile</p></li>
<li><p>Predicted vs. Observed</p></li>
<li><p>Residuals vs. Time</p></li>
<li><p>Histogram of Residuals</p></li>
<li><p>Total error</p></li>
<li><p>Number of evaluations</p></li>
<li><p>Identification parameters: min/max/start/best value</p></li>
<li><p>Warning if best values are "close to" boundaries</p></li>
</ul></li>
<li><p>Easy cloning of PI configuration within a project</p></li>
<li><p>Replacing simulations in PI configuration without losing the settings</p></li>
<li><p>Update simulations with optimized parameter values</p></li>
<li><p>Export of PI to Matlab (optimization problem can be run in Matlab using any built-in algorithm)</p></li>
<li><p>Calculation of time profile confidence intervals</p>
<ul>
<li><p><strong>Confidence Interval:</strong> Corresponds to the model error, which is based on the uncertainty of estimated parameters. This uncertainty is based on an estimation of the difference between the mean value of used observed data compared with the mean value of the (unknown) total data.</p></li>
<p><img src="assets/images/factsheet/image009.png"  /></p>
</li>
<li><p><strong>Visual Predictive Check Interval:</strong> Corresponds to the uncertainty based on the data error. The data error is the standard deviation of the distribution of the used observed data.</p></li>
<p><img src="assets/images/factsheet/image011.png" /></p>
<li><p><strong>Prediction Interval:</strong> Corresponds to the combination of the model error and the data error. It shows how much future measured data are expected to differ from the model predictions.</p></li>
<p><img src="assets/images/factsheet/image013.png" /></p></td>
</ul>
</tr>
<tr class="odd">
<td style="vertical-align:top"><p>Sensitivity analysis</p></td>
<td><p><strong>Sensitivity of PK-Parameters (AUC, C<sub>Max</sub>, …) vs. simulation parameters.</strong></p>
<p>Because PBPK models can be complex and contain numerous input parameters, it would be useful to know which input parameters have the most impact on the output curves. The Sensitivity Analysis tool provides an answer to this question.</p>
<p>For a chosen simulation, the relative impact of selected - or all - input parameters on the PK parameters of the output curves is calculated and displayed. In addition, the input parameters can be ranked by their impact on a certain PK parameter of an output. Results of Sensitivity Analysis can be shown as:</p>
<ul>
<li><p>Sensitivity table:</p></li>
</ul>
<p><img src="assets/images/factsheet/image015.png" /></p>
<ul>
<li><p>Ranking of most sensitive simulation parameters. Most sensitive parameters comprise all parameters that contribute to 90% of total sensitivity.</p></li>
</ul>
<p><img src="assets/images/factsheet/image017.png" /></p></td>
</tr>
<tr class="even">
<td style="vertical-align:top"><p>Lab Journal</p></td>
<td><ul>
<li><p>automated documentation of modeling work in model history working journal documenting including labeling and commenting function</p></li>
<li><p>built-in working journal for manual annotation of models and simulations</p></li>
<li><p>roll-back / undo functionality</p></li>
</ul>
<p><img src="assets/images/factsheet/image019.png" /></p>
<p><img src="assets/images/factsheet/image021.png" /></p></td>
</tr>
<tr class="odd">
<td>Model editor</td>
<td>full transparency and full edit access to all structural model properties</td>
</tr>
<tr class="even">
<td colspan="2" align="center"><b>Simulation tools</b></td>
</tr>
<tr class="odd">
<td></td>
<td><ul>
<li><p>Simulation creation by simple combining of previously defined building blocks</p></li>
<li><p>Simulation of individuals and populations</p></li>
<li><p>(Optional) Aging</p></li>
</ul>
<p style="padding-left: 2em;">If a human individual or population is selected the growth of the human individual(s) during the simulation time will be taken into account when choosing this option.</p>
<p style="padding-left: 2em;">Based on the human growth and maturation functions available for most parameters in PK-Sim® (e.g. organ volumes, blood flow rates, organ composition, etc.) the parameters are updated along the time scale of the simulation. This is important for multiple drug administration to e.g. preterm and term neonates, for which the rapid changes in anatomical and physiological properties can influence the pharmacokinetics during the simulated study circle.</p>
<ul>
<li><p>Calculation of drug time courses in the most important organs (TODO - full list) for every subcompartment (Plasma, Endosome, Interstitial, Intracellular, Blood Cells)</p></li>
<li><p>Calculation of the fraction of dose metabolized/excreted</p></li>
<li><p>Plotting of all calculated time courses</p>
<ul>
<li><p>plot settings (axes, styles, blabla)</p></li>
<li><p>Individual simulations:</p>
<ul>
<li><p>Time profile plots</p></li>
</ul></li>
<li><p>Population simulations</p>
<ul>
<li><p>Time profile plots</p></li>
</ul></li>
</ul></li>
</ul>
<p><img src="assets/images/factsheet/image023.png"  /></p>
<ul>
<li><p>Box-Whisker plots</p></li>
</ul>
<p><img src="assets/images/factsheet/image025.png" /></p>
<ul>
<li><p>Range plots</p></li>
</ul>
<p><img src="assets/images/factsheet/image027.png" /></p>
<ul>
<li><p>Scatter plots</p></li>
</ul>
<p><img src="assets/images/factsheet/image029.png"  /></p>
<ul>
<li><p>Multiple plots per simulation</p></li>
<li><p>Export of plotted/simulated results to Excel/CSV/PDF/Image</p></li>
</ul>
<ul>
<li><p>Calculation of the most important PK-Parameters</p>
<ul>
<li><p>In all simulations</p>
<ul>
<li><p>AUC_tEnd</p></li>
<li><p>AUC_inf</p></li>
<li><p>%AUC(tlast-inf)</p></li>
<li><p>AUC_tEnd_norm</p></li>
<li><p>AUC_inf_norm</p></li>
<li><p>AUC Ratio (AUCR)</p></li>
<li><p>C_max</p></li>
<li><p>C_max_norm</p></li>
<li><p>C_max Ratio (Cmax_R)</p></li>
<li><p>C_tEnd</p></li>
<li><p>t_max</p></li>
<li><p>Half-Life</p></li>
<li><p>MRT</p></li>
</ul></li>
<li><p>In simulations with intravenous administration</p>
<ul>
<li><p>VSS(plasma)</p></li>
<li><p>Vd(plasma)</p></li>
<li><p>Vss(phys-chem)</p></li>
<li><p>Total plasma clearance CL</p></li>
<li><p>Total body clearance</p></li>
</ul></li>
<li><p>In simulations with oral administration</p>
<ul>
<li><p>Vss(plasma)/F</p></li>
<li><p>Vd(plasma)/F</p></li>
<li><p>Total plasma clearance/F</p></li>
<li><p>Fraction absorbed</p></li>
<li><p>Bioavailability</p></li>
</ul></li>
<li><p>In simulations with multiple administrations</p>
<ul>
<li><p>AUC_inf_tD1</p></li>
<li><p>AUC_inf_tD1_n</p></li>
<li><p>...tDi-tDj</p></li>
</ul></li>
</ul></li>
</ul>
<p style="padding-left: 4em;">Respective PK parameter from the administration time of the first dose until the administration time of the second dose</p>
<ul>
<li><p>...tDlast-tDEnd</p></li>
<li><p>...tDlast-1- tDlast</p></li>
<li><p>C_trough_dDi</p></li>
<li><p>C_trough_dlast</p></li>
</ul>
<ul>
<li><p>Comparisons of calculated simulation results over multiple simulations (both individual and population simulations)</p></li>
<li><p>Cloning of simulation</p></li>
</ul>
<ul>
<li><p>Replacing of Building Blocks in already created simulations</p></li>
<li><p>Synchronization between a building block used to create a simulation and the simulation</p></li>
<li><p>Comparison between simulations</p></li>
<li><p>Comparison between building blocks and simulations</p></li>
</ul>
<p><img src="assets/images/factsheet/image031.png" /></p>
<ul>
<li><p>Comparison of building blocks can also be done between two simulations on the same kind of building block</p></li>
</ul>
<p><img src="assets/images/factsheet/image033.png" /></p>
<ul>
</ul></td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
<tr class="odd">
<td colspan="2" align="center"><b>Data</br></td>
</tr>
<tr class="even">
<td style="vertical-align:top">Data import</td>
<td>
<p>import filters for</p>
<ul>
<li><p>MS Excel</p></li>
<li><p>csv file</p></li>
<li><p>Nonmem files</p></li>
</ul></td>
</tr>
<tr class="odd">
<td>Model import</td>
<td>
<p>Import of SBML models</p>
</td>
</tr>
<tr class="even">
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Non-compartmental analysis</td>
<td>
<p>NCA calculation for TODO</p>
</td>
</tr>
</tbody>
</table>

|               |                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| MoBi          |                                                                                                                              |
| Editing       | Editing of PK-Sim simulations to the detail of all parameters, structural elements, transports, reactions, events, and more. |
|               | Adding features to PK-Sim models, like tumors, complex molecular interactions, or non-standard drug applications             |
|               | Display and editing of a simulation as tree or diagram                                                                       |
| Comparing     | Result comparison charts                                                                                                     |
|               | Simulation and building block comparison, exportable list of differences                                                     |
| Merging       | Merging of building blocks from different simulations                                                                        |
| Simulating    | Parameter identification and sensitivity analysis                                                                            |
|               | Re-sending simulations back to PK-Sim for population simulation                                                              |
| Documentation | Integrated working journal, sharable with PK-Sim, for documentation                                                          |
|               | Automatic tracking of changes made in a history log file                                                                     |
| Export        | Export of simulated results as Excel file                                                                                    |
|               | Various formats of model exports and listings, like XML, Excel                                                               |
| Import        | Import of model parameters from Excel files                                                                                  |
|               | Import of model files in SBML format for QSP model building                                                                                         |
| Building      | Building models from scratch, like reaction pathways into a user-built spatial structure or for compartmental modeling       |
|               | Option to select frequently accessed parameters as favorites                                                                 |

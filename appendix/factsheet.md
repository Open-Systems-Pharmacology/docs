# OSP Suite Fact Sheet

## Main modeling and simulation features:

* PBPK modeling of small molecules and biologics
* Species Extrapolation / First in Human dose prediction
* Parent-Metabolite Studies / Drug-Drug-Interaction
* Pediatric Study Design – PIP/PDP support
* Special Populations: Hepatic/Renal impairment / Obese / Elderly / \(Pre\)term neonates / Children / Pregnant women / more
* Formulations / Meal effects
* PBPK/PD, QSP as well as pathway, network and disease modeling

<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>Model building blocks</b>
      </th>
      <th style="text-align:left"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Organisms</td>
      <td style="text-align:left">
        <p>Pre-parameterized whole-body PBPK models including detailed integrated
          GI tract for</p>
        <ul>
          <li>Human</li>
          <li>Monkey</li>
          <li>Dog (beagle and mongrale)</li>
          <li>Minipig</li>
          <li>Rat</li>
          <li>Mouse</li>
          <li>Rabbit</li>
        </ul>
        <p>Allowing for full flexibility for parameterization of (anthropo)metrics,
          anatomical and physiological properties, protein expression levels ETC.</p>
        <p>Most important organs included. For each organ optional processes can
          be added:</p>
        <ul>
          <li>Metabolizing pathways</li>
          <li>Different active transporter types(influx, efflux, Pgp-like)</li>
          <li>Protein binding partners</li>
        </ul>
        <p>Biliary tract included, enables enterohepatic cycling</p>
        <ul>
          <li>Scaling of Individuals</li>
        </ul>
        <p>Scaling can be used to change the biometrics of an existing individual,
          i.e. an adult model may be scaled to an infant model while maintaining/scaling
          all specific modifications</p>
        <ul>
          <li></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Populations</td>
      <td style="text-align:left">
        <p>Database for population simulations with distributions of anatomical and
          physiological parameters for</p>
        <ul>
          <li>European Caucasians (ICRP, 2002)</li>
          <li>US Caucasian (NHANES, 1997)</li>
          <li>US Asians (NHANES, 1997)</li>
          <li>US Africans (NHANES, 1997)</li>
          <li>Asian (Tanaka, 1996)</li>
          <li>Japanese (2015)</li>
          <li>Preterms (2015)</li>
          <li>Pregnant (Dallmann et al. 2017)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Protein Expression</td>
      <td style="text-align:left">
        <p>The PK-Sim&#xAE; library includes large-scale gene-expression data from
          publicly available sources which were downloaded, processed, stored and
          customized such that they can be directly utilized in PBPK model building.
          Public database which were imported are</p>
        <ul>
          <li>Whole genome expression arrays from ArrayExpress (European Informatics
            Institute, 2010, http://www.ebi.ac.uk/microarray-as/ae/)</li>
          <li>RT-PCR derived gene expression (Nishimura et al., 2003; Nishimura and
            Naito, 2005, 2006)</li>
          <li>Expressed sequence tags (EST) from UniGene (National Center for Biotechnology
            Information, 2010, http://www.ncbi.nlm.nih.gov/unigene).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Compounds</td>
      <td style="text-align:left">
        <p>Full ADME characterization of drugs including</p>
        <ul>
          <li>Molecular weight</li>
          <li>Lipophilicity</li>
          <li>Protein binding</li>
          <li>Acid/base pKa</li>
          <li>Solubility</li>
          <li>Intestinal permeability</li>
          <li>Specific protein binding kinetics</li>
          <li>Enzyme specific metabolization kinetics</li>
          <li>Transporter specific transport kinetics</li>
          <li>Inhibition and induction parameters</li>
        </ul>
        <p>and for large therapeutic molecules (e.g. antibodies)</p>
        <ul>
          <li>Solute radius (calculated for molecular weight as per default)</li>
          <li>Dissociation constant for binding to FcRn</li>
        </ul>
        <p>Including a set of pre-parameterized standard compounds</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Partition Coefficients</td>
      <td style="text-align:left">
        <p>Prediction models for tissue partition coefficients</p>
        <ul>
          <li>PK-Sim 2003</li>
          <li>Rodgers &amp; Rowland</li>
          <li>Schmitt</li>
          <li>Poulin &amp; Theil</li>
          <li>Berezhkovsky</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Permeability</td>
      <td style="text-align:left">Prediction models for cellular permeabilities and intestinal permeability</td>
    </tr>
    <tr>
      <td style="text-align:left">Formulations</td>
      <td style="text-align:left">
        <ul>
          <li>Dissolved</li>
          <li>Particle distribution</li>
          <li>Weibull</li>
          <li>Lint80</li>
          <li>Table</li>
          <li>1st order</li>
          <li>Zero order</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Administration protocols</td>
      <td style="text-align:left">
        <p>Administration routes:</p>
        <ul>
          <li>IV (Bolus and Infusion)</li>
          <li>Oral</li>
          <li>User defined (free choice of target organ/compartment)</li>
        </ul>
        <p>Administration Schemes:</p>
        <ul>
          <li>Single</li>
          <li>once daily, bi-daily, &#x2026;</li>
          <li>
            <p>complex (multi-)periodic schemes</p>
            <p>
              <img src="../.gitbook/assets/PKSim_Protocol_AdvancedEx.png" alt/>
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Events</td>
      <td style="text-align:left">
        <ul>
          <li>Meals</li>
          <li>Gallbladder emptying</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Modeling tools</b>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">Parameter identification (PI)</td>
      <td style="text-align:left">
        <p>A fully integrated PI Toolbox provides a straightforward means to adjust
          key model parameters automatically within user-defined ranges. It is possible
          to optimize multiple simulations, for example with different dose levels,
          and multiple observed data sets, simultaneously. A clear visualization
          of the optimization process and of the optimization results gives you full
          control and direct feedback whether the identification process was successful.</p>
        <p>
          <img src="../.gitbook/assets/Tab_Data.png" alt/>
        </p>
        <p>
          <img src="../.gitbook/assets/Tab_Parameters.png" alt/>
        </p>
        <p>
          <img src="../.gitbook/assets/visual-feedback-data.jpg" alt/>
        </p>
        <p>
          <img src="../.gitbook/assets/Results_Calculation_Methods_Variation.png"
          alt/>
        </p>
        <ul>
          <li>Simultaneous optimization of multiple simulations</li>
          <li>Simultaneous optimization of multiple observed data sets</li>
          <li>LLOQ (Lower Limit of Quantification) values are taken into account</li>
          <li>Linking of multiple simulation parameters to one identification parameter
            (as absolute value or as a factor)</li>
          <li>Lin/Log scaling of identification parameters</li>
          <li>Lin/Log scaling of residuals</li>
          <li>Multiple optimizations with randomized start values</li>
          <li>Combining parameter identification with optimization for best suited partition
            coefficients/permeability methods</li>
          <li>Available optimization algorithms:
            <ul>
              <li>Nelder-Mead</li>
              <li>Levenberg-Marquardt</li>
              <li>Monte-Carlo</li>
            </ul>
          </li>
          <li>Visual feedback during optimization
            <ul>
              <li>Time profile</li>
              <li>Predicted vs. Observed</li>
              <li>Error history: Total error vs number of evaluations</li>
              <li>Total error: current/best value</li>
              <li>Identification parameters: current/best value</li>
              <li>Export of parameters history to MS-Excel</li>
            </ul>
          </li>
          <li>Visualization of optimization results
            <ul>
              <li>Time profile</li>
              <li>Predicted vs. Observed</li>
              <li>Residuals vs. Time</li>
              <li>Histogram of Residuals</li>
              <li>Total error</li>
              <li>Number of evaluations</li>
              <li>Identification parameters: min/max/start/best value</li>
              <li>Warning if best values are &quot;close to&quot; boundaries</li>
            </ul>
          </li>
          <li>Easy cloning of PI configuration within a project</li>
          <li>Replacing simulations in PI configuration without losing the settings</li>
          <li>Update simulations with optimized parameter values</li>
          <li>Export of PI to Matlab (optimization problem can be run in Matlab using
            any built-in algorithm)</li>
          <li>Calculation of time profile confidence intervals
            <ul>
              <li>
                <p><b>Confidence Interval:</b> Corresponds to the model error, which is based
                  on the uncertainty of estimated parameters. This uncertainty is based on
                  an estimation of the difference between the mean value of used observed
                  data compared with the mean value of the (unknown) total data.</p>
                <p>
                  <img src="../.gitbook/assets/PI_ConfidenceInterval.png" alt/>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p><b>Visual Predictive Check Interval:</b> Corresponds to the uncertainty
              based on the data error. The data error is the standard deviation of the
              distribution of the used observed data.</p>
            <p>
              <img src="../.gitbook/assets/PI_VPCCheckInterval.png" alt/>
            </p>
          </li>
          <li>
            <p><b>Prediction Interval:</b> Corresponds to the combination of the model
              error and the data error. It shows how much future measured data are expected
              to differ from the model predictions.</p>
            <p>
              <img src="../.gitbook/assets/PI_PredictionInterval.png" alt/>
            </p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Sensitivity Analysis</td>
      <td style="text-align:left">
        <p><b>Sensitivity of PK-Parameters (AUC, CMax, &#x2026;) vs. simulation parameters.</b>
        </p>
        <p>Because PBPK models can be complex and contain numerous input parameters,
          it would be useful to know which input parameters have the most impact
          on the output curves. The Sensitivity Analysis tool provides an answer
          to this question.</p>
        <p>For a chosen simulation, the relative impact of selected - or all - input
          parameters on the PK parameters of the output curves is calculated and
          displayed. In addition, the input parameters can be ranked by their impact
          on a certain PK parameter of an output. Results of Sensitivity Analysis
          can be shown as:</p>
        <ul>
          <li>Sensitivity table:</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/SA_Results1.png" alt/>
        </p>
        <ul>
          <li>Ranking of most sensitive simulation parameters. Most sensitive parameters
            comprise all parameters that contribute to 90% of total sensitivity.</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/SA_Ranking1.png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Lab Journal</td>
      <td style="text-align:left">
        <ul>
          <li>Automated documentation of modeling work in model history working journal
            documenting including labeling and commenting function</li>
          <li>Built-in working journal for manual annotation of models and simulations</li>
          <li>Roll-back / undo functionality</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/image019.png" alt/>
        </p>
        <p>
          <img src="../.gitbook/assets/image021.png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Model Editor</td>
      <td style="text-align:left">Full transparency and full edit access to all structural model properties</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Simulation Tools</b>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left">
        <ul>
          <li>Simulation creation by simple combining of previously defined building
            blocks</li>
          <li>Simulation of individuals and populations</li>
        </ul>
        <p>If a human individual or population is selected the growth of the human
          individual(s) during the simulation time will be taken into account when
          choosing this option.</p>
        <p>Based on the human growth and maturation functions available for most
          parameters in PK-Sim&#xAE; (e.g. organ volumes, blood flow rates, organ
          composition, etc.) the parameters are updated along the time scale of the
          simulation. This is important for multiple drug administration to e.g.
          preterm and term neonates, for which the rapid changes in anatomical and
          physiological properties can influence the pharmacokinetics during the
          simulated study circle.</p>
        <ul>
          <li>Calculation of drug time courses in the most important organs for every
            subcompartment (Plasma, Endosome, Interstitial, Intracellular, Blood Cells)</li>
          <li>Calculation of the fraction of dose metabolized/excreted</li>
          <li>Plotting of all calculated time courses
            <ul>
              <li>Plot settings (axes, styles, etc.)</li>
              <li>
                <p>Individual simulations:</p>
                <ul>
                  <li>Time profile plots</li>
                </ul>
                <p>
                  <img src="../.gitbook/assets/PK-Sim_CreateSimulation_RunSimulation_Results1.png"
                  alt/>
                </p>
              </li>
              <li>Population simulations
                <ul>
                  <li>Time profile plots</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          <img src="../.gitbook/assets/PK-Sim_CreateSimulation_PopSim_TimeProfile_Outputs.png"
          alt/>
        </p>
        <p>
          <img src="../.gitbook/assets/PK-Sim_CreateSimulation_PopSim_TimeProfile_Plot1.png"
          alt/>
        </p>
        <ul>
          <li>Box-Whisker plots</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/image025.png" alt/>
        </p>
        <ul>
          <li>Range plots</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/image027.png" alt/>
        </p>
        <ul>
          <li>Scatter plots</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/image029.png" alt/>
        </p>
        <ul>
          <li>Multiple plots per simulation</li>
          <li>Export of plotted/simulated results to Excel/CSV/PDF/Image</li>
          <li>Calculation of the most important PK-Parameters
            <ul>
              <li>In all simulations
                <ul>
                  <li>AUC_tEnd</li>
                  <li>AUC_inf</li>
                  <li>%AUC(tlast-inf)</li>
                  <li>AUC_tEnd_norm</li>
                  <li>AUC_inf_norm</li>
                  <li>AUC Ratio (AUCR)</li>
                  <li>C_max</li>
                  <li>C_max_norm</li>
                  <li>C_max Ratio (Cmax_R)</li>
                  <li>C_tEnd</li>
                  <li>t_max</li>
                  <li>Half-Life</li>
                  <li>MRT</li>
                </ul>
              </li>
              <li>In simulations with intravenous administration
                <ul>
                  <li>VSS(plasma)</li>
                  <li>Vd(plasma)</li>
                  <li>Vss(phys-chem)</li>
                  <li>Total plasma clearance CL</li>
                  <li>Total body clearance</li>
                </ul>
              </li>
              <li>In simulations with oral administration
                <ul>
                  <li>Vss(plasma)/F</li>
                  <li>Vd(plasma)/F</li>
                  <li>Total plasma clearance/F</li>
                  <li>Fraction absorbed</li>
                  <li>Bioavailability</li>
                </ul>
              </li>
              <li>In simulations with multiple administrations
                <ul>
                  <li>AUC_inf_tD1</li>
                  <li>AUC_inf_tD1_n</li>
                  <li>...tDi-tDj</li>
                  <li>...tDlast-tDEnd</li>
                  <li>...tDlast-1- tDlast</li>
                  <li>C_trough_dDi</li>
                  <li>C_trough_dlast</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Comparisons of calculated simulation results over multiple simulations
            (both individual and population simulations)</li>
          <li>Cloning of simulation</li>
          <li>Replacing of Building Blocks in already created simulations</li>
          <li>Synchronization between a building block used to create a simulation and
            the simulation</li>
          <li>Comparison between simulations</li>
          <li>Comparison between building blocks and simulations</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/image031.png" alt/>
        </p>
        <ul>
          <li>Comparison of building blocks can also be done between two simulations
            on the same kind of building block</li>
        </ul>
        <p>
          <img src="../.gitbook/assets/image033.png" alt/>
        </p>
        <ul>
          <li></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"><b>Data<br /></b>
      </td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left">Data import</td>
      <td style="text-align:left">
        <p>Import filters for</p>
        <ul>
          <li>MS Excel</li>
          <li>csv file</li>
          <li>Nonmem files</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Model import</td>
      <td style="text-align:left">Import of SBML models</td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
    </tr>
    <tr>
      <td style="text-align:left"></td>
      <td style="text-align:left"></td>
    </tr>
  </tbody>
</table>

|  |  |
| :--- | :--- |
| MoBi |  |
| Editing | Editing of PK-Sim simulations to the detail of all parameters, structural elements, transports, reactions, events, and more. |
|  | Adding features to PK-Sim models, like tumors, complex molecular interactions, or non-standard drug applications |
|  | Display and editing of a simulation as tree or diagram |
| Comparing | Result comparison charts |
|  | Simulation and building block comparison, exportable list of differences |
| Merging | Merging of building blocks from different simulations |
| Simulating | Parameter identification and sensitivity analysis |
|  | Re-sending simulations back to PK-Sim for population simulation |
| Documentation | Integrated working journal, sharable with PK-Sim, for documentation |
|  | Automatic tracking of changes made in a history log file |
| Export | Export of simulated results as Excel file |
|  | Various formats of model exports and listings, like XML, Excel |
| Import | Import of model parameters from Excel files |
|  | Import of model files in SBML format for QSP model building |
| Building | Building models from scratch, like reaction pathways into a user-built spatial structure or for compartmental modeling |
|  | Option to select frequently accessed parameters as favorites |


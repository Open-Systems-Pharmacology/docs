# Command-Line Interface (CLI)

PK-Sim provides a command-line interface for automation and batch processing. The current CLI supports four workflows:

* running simulations from snapshot files with the `run` command,
* converting PK-Sim projects and snapshots with the `snap` command,
* exporting simulations from a project file with the `export` command,
* validating or executing qualification workflows with the `qualification` command.

The CLI returns exit code `0` when a command finishes successfully and a non-zero exit code if argument parsing fails or an exception is raised during execution.

## Prerequisites

Before using the CLI, make sure that:

* PK-Sim is installed on Windows,
* you run the command from a shell that can access the PK-Sim installation directory,
* input files and output directories are accessible from that shell.

> **Note:** Any argument value (file name, folder path, etc.) that contains spaces must be enclosed in double quotes, e.g. `"C:\My Projects\input"`.

## Starting the CLI

Open `cmd` or PowerShell and change to the PK-Sim installation directory. Then use built-in help:

```powershell
PKSim.CLI --help
PKSim.CLI run --help
PKSim.CLI snap --help
PKSim.CLI export --help
PKSim.CLI qualification --help
```

## Batch run workflow (`run`)

Use `run` to process all snapshot JSON files in an input folder, run simulations, and export selected artifacts.

### Purpose

This workflow is intended for automated execution of multiple snapshot-based projects. It runs simulations from JSON snapshot files found in the input folder and exports the selected output artifacts to the output folder.

### Required options

* `-i, --input` folder containing batch snapshot `*.json` files
* `-o, --output` folder for exported files

### Optional behavior

* `--forAll` runs simulations with all outputs enabled (default is `false`)

### Export format flags

* `-c, --csv` export simulation results to CSV
* `-x, --xml` export simulations to SimModel-XML
* `-j, --json` export results to JSON (individual simulations only)
* `-k, --pkml` export simulations to PKML
* `-e, --excel` export results to XLSX (individual simulations only)

### Logging options

* `--logLevel <Debug|Information|Warning|Error>` controls verbosity. Default is `Information`.
* `-l, --log <full path>` writes logs to a file in addition to console output.

### Examples

```powershell
PKSim.CLI run -i C:\Batch\Input -o C:\Batch\Output --csv --xml
PKSim.CLI run -i C:\Batch\Input -o C:\Batch\Output --json --forAll
```

## Snapshot workflow (`snap`)

Use `snap` to convert batches of PK-Sim projects and snapshots.

### Purpose

This workflow converts project representations in bulk between PK-Sim project files and snapshot files so projects can be recreated or migrated with snapshot-based automation.

### Required options

* `-i, --input` input folder
* `-o, --output` output folder

### Conversion mode

* `-s, --snapshot` converts `*.pksim5` project files to `*.json` snapshots
* `-p, --project` converts `*.json` snapshots to `*.pksim5` project files

### Logging options

* `--logLevel <Debug|Information|Warning|Error>` controls verbosity. Default is `Information`.
* `-l, --log <full path>` writes logs to a file in addition to console output.

### Examples

```powershell
PKSim.CLI snap -i C:\Work\Projects -o C:\Work\Snapshots --snapshot
PKSim.CLI snap -i C:\Work\Snapshots -o C:\Work\Projects --project
```

## Project export workflow (`export`)

Use `export` to load one PK-Sim project file and export all or selected simulations.

### Purpose

This workflow is intended for exporting simulation artifacts from a specific PK-Sim project. It can export all simulations or a selected subset, with optional simulation execution before export.

### Required options

* `-p, --project` full path to the `*.pksim5` project file
* `-o, --output` output folder for exported artifacts

### Optional behavior

* `-s, --simulations` optional list of simulation names separated by spaces (e.g. `-s S1 S2 "My Simulation"`); if omitted, all simulations are exported
* `-r, --run` run simulations before export (default is `false`)

### Export format flags

* `-c, --csv` export simulation results to CSV
* `-x, --xml` export simulations to SimModel-XML
* `-j, --json` export results to JSON (individual simulations only)
* `-k, --pkml` export simulations to PKML
* `-e, --excel` export results to XLSX (individual simulations only)

### Logging options

* `--logLevel <Debug|Information|Warning|Error>` controls verbosity. Default is `Information`.
* `-l, --log <full path>` writes logs to a file in addition to console output.

### Examples

```powershell
PKSim.CLI export -p C:\Projects\Example.pksim5 -o C:\Exports --csv --xml
PKSim.CLI export -p C:\Projects\Example.pksim5 -o C:\Exports --run --csv -s "Sim 1" "Sim 2"
```

## Qualification workflow (`qualification`)

Use `qualification` to validate or run a qualification workflow from a [qualification plan](https://docs.open-systems-pharmacology.org/shared-tools-and-example-workflows/qualification).

### Purpose

This workflow supports qualification automation from a [qualification plan](https://docs.open-systems-pharmacology.org/shared-tools-and-example-workflows/qualification), including validation-only runs and full qualification processing with optional simulation execution and project export.

### Required option

* `-i, --input` path to the JSON qualification plan

### Workflow options

* `-v, --validate` validation run
* `-r, --run` run simulations during qualification processing
* `-e, --exp` additionally export project files (`*.json` snapshot and `*.pksim5` project)

### Logging options

* `--logLevel <Debug|Information|Warning|Error>` controls verbosity. Default is `Information`.
* `-l, --log <full path>` writes logs to a file in addition to console output.

### Examples

```powershell
PKSim.CLI qualification -i C:\Qualifications\qualification.json --validate
PKSim.CLI qualification -i C:\Qualifications\qualification.json --run --exp
```

## Notes

* Snapshot conversion and batch run commands process files in the specified input folder.
* If required files are missing (for example, input folders, project files, or configuration files), the command fails with an error.
* For population simulations, population CSV export is always generated by the export pipeline.

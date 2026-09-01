# Command-Line Interface (CLI)

MoBi provides a command-line interface for automating workflows that would otherwise require repeated manual work in the desktop application. The current CLI supports two batch-oriented workflows:

* converting MoBi project files and MoBi snapshot files with the `snap` command,
* running or validating qualification workflows with the `qualification` command.

The CLI returns exit code `0` when the command finishes successfully and a non-zero exit code if argument parsing fails or an exception is raised during execution.

## Prerequisites

Before using the CLI, make sure that:

* MoBi is installed on Windows,
* you run the command from a shell that can access the MoBi installation directory,
* for qualification workflows that rebuild PK-Sim modules, a compatible PK-Sim installation is available locally.

If a qualification run needs PK-Sim modules, MoBi uses the PK-Sim path stored in the MoBi user settings unless you override it on the command line.

## Starting the CLI

Open `cmd` or PowerShell and change to the MoBi installation directory. Then use the built-in help to inspect the available verbs and options:

```powershell
MoBi.CLI --help
MoBi.CLI snap --help
MoBi.CLI qualification --help
```

## Snapshot workflow (`snap`)

Use the `snap` command to convert batches of MoBi projects and MoBi snapshots.

### Purpose

The command supports these conversions:

* `*.mbp3` project files to `*.json` snapshot files,
* `*.json` snapshot files to `*.mbp3` project files.

The CLI scans the specified input folder, processes the matching files in that folder, and writes converted files with the same base name into the output folder. The output folder is created automatically if it does not exist.

### Required options

* `-i, --input` input folder containing the files to convert
* `-o, --output` output folder for the converted files

### Conversion mode

Choose one of the following options:

* `-s, --snapshot` converts MoBi project files in the input folder to snapshot files in the output folder
* `-p, --project` converts snapshot files in the input folder to MoBi project files in the output folder

### Optional behavior

* `--pksim <path>` file path where PK-Sim can be found. It is required when loading snapshots that use PK-Sim modules and defaults to the value stored in the MoBi user settings. Note that this option has no short form, in contrast to `-p, --project`.

### General options

* `--cores <number>` maximum number of cores used for parallel work such as model construction and simulation runs. Default is the number of processors minus one. A value smaller than 1 is raised to 1, so at least one core is always used.
* `--logLevel <Debug|Information|Warning|Error>` controls the console and file log verbosity. The default is `Information`.
* `-l, --log <full path>` writes log output to a file in addition to the console output.

### Examples

Create snapshot files from MoBi projects:

```powershell
MoBi.CLI snap -i C:\Work\MoBiProjects -o C:\Work\Snapshots --snapshot
```

Create MoBi projects from snapshot files:

```powershell
MoBi.CLI snap -i C:\Work\Snapshots -o C:\Work\Projects --project
```

Create MoBi projects and only keep error messages in the log:

```powershell
MoBi.CLI snap -i C:\Work\Snapshots -o C:\Work\Projects --project --logLevel Error
```

### Notes

* When MoBi creates a project from a snapshot, it rebuilds the project from the serialized snapshot content and saves a new `*.mbp3` file.
* If no matching files are found in the input folder, the command finishes without creating converted files.

## Qualification workflow (`qualification`)

Use the `qualification` command to execute or validate a qualification workflow described by a JSON configuration file.

### Purpose

The qualification workflow is driven by a single configuration file that defines the qualification inputs and output locations. Depending on the supplied options and configuration, the workflow can:

* validate a qualification setup,
* rebuild a MoBi project from a snapshot,
* export the simulations required for the qualification as `*.pkml` files,
* export observed data used by the qualification as `*.csv` and `*.xlsx`,
* generate mapping and report-support files defined in the configuration.

The configuration file determines paths such as the source snapshot file, output folder, temporary folder, mapping file, report configuration file, inputs folder, and observed data folder.

### Required option

* `-i, --input` path to the JSON configuration file

### Workflow options

* `-v, --validate` validates the qualification input instead of running the full workflow
* `-r, --run` rebuilds the project and exports the qualification artifacts needed for downstream processing
* `-e, --exp` additionally exports project files requested by the qualification workflow
* `-p, --pksim <path>` overrides the PK-Sim path stored in the MoBi user settings

### General options

* `--cores <number>` maximum number of cores used for parallel work such as model construction and simulation runs. Default is the number of processors minus one. A value smaller than 1 is raised to 1, so at least one core is always used.
* `--logLevel <Debug|Information|Warning|Error>` controls the console and file log verbosity. The default is `Information`.
* `-l, --log <full path>` writes log output to a file in addition to the console output.

### Examples

Validate a qualification configuration:

```powershell
MoBi.CLI qualification -i C:\Qualifications\qualification.json --validate
```

Run a qualification workflow and override the PK-Sim location:

```powershell
MoBi.CLI qualification -i C:\Qualifications\qualification.json --run --pksim "C:\Program Files\Open Systems Pharmacology\PK-Sim 13\PKSim.exe"
```

Run the workflow, export additional project files, and write a log file:

```powershell
MoBi.CLI qualification -i C:\Qualifications\qualification.json --run --exp --log C:\Qualifications\qualification.log
```

### Notes

* Qualifications that reference PK-Sim modules require access to PK-Sim so the modules can be rebuilt during project generation.
* Simulation exports are limited to the simulations referenced by the qualification configuration.
* Re-running a qualification replaces the project-specific output folder under the configured output folder.
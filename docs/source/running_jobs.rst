.. _running_jobs:

Running Jobs
===============

Accounting
-------------------------

The charge unit for *TGI RAILS* is the Service Unit (SU). This corresponds
to the equivalent use of one compute core utilizing less than or equal
to 2G of memory for one hour. *Keep in mind that your charges are based on the resources that
are reserved for your job and don't necessarily reflect how the
resources are used.* Charges are based on either the number of cores or
the fraction of the memory requested, whichever is larger.

.. table:: Service Unit Equivalents by Node Type

   ====================== ======================== ======= ===========
   Node Type              Service Unit Equivalence GPUs    Host Memory  
   ====================== ======================== ======= ===========
   CPU core               1                        N/A     5.3 GB
   CPU Node               96                       N/A     512 GB
   GPU Node: One H100     120                      1 H100  256 GB
   GPU Node: 8-way H100   960                      8 H100  2048 GB
   ====================== ======================== ======= ===========

Local Account Charging
~~~~~~~~~~~~~~~~~~~~~~

Use the ``accounts`` command to list the accounts available for
charging. Users start out with a single chargeable project but may
be added to other projects over time.

::

  [cmendes@railsl2 ~]$ accounts
  Project Summary for User cmendes:

  Project        Description      Usage (SUs)
  -------------  -------------  -------------
  bcfz-tgirails  tgi                    21068

Job Accounting Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  A node-exclusive job that runs on a CPU compute node for one hour will be
   charged 96 SUs (96 cores x 1 hour)
-  A node-exclusive job that runs on an 8-way GPU node for one hour will
   be charged 960 SUs (8 GPUs x 1 hour)

QOSGrpBillingMinutes
~~~~~~~~~~~~~~~~~~~~

If you see QOSGrpBillingMinutes under the Reason column for the squeue
command, as in

::

                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
              1204221       cpu    myjob     .... PD       0:00      5 (QOSGrpBillingMinutes)

then the resource allocation specified for the job (i.e. xyzt-tgirails
) does not have sufficient balance to run the job based on the # of
resources requested and the wallclock time. Sometimes it maybe other
jobs from the same project that in the same QOSGrpBillingMinutes state
are could cause other jobs using the same resource allocation that are
preventing a job that would "fit" from running. The PI of the project
needs to put in a supplement request using the XRAS proposal system.

Reviewing job charges for a project ( jobcharge )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

jobcharge in /sw/user/scripts/ will show job charges by user for a
project. Example usage:

::

 [cmendes@railsl1 ~]$ jobcharge -d 180 bcfz-tgirails
 Charges for account bcfz-tgirails from 2024-09-11-10:20:37 through 2025-03-10-10:20:37.
 User        Charge (SU)
 --------  -------------
 abbode2          257.39
 arnoldg            6.56
 cmendes           45.9
 jenos            724.81
 mshow            343.19
 rbrunner         245.53
 Total           1623.38

 [cmendes@railsl1 ~]$ jobcharge -h
 usage: jobcharge [-h] [-s STARTTIME] [-e ENDTIME] [--detail] [-m MONTH] [-y YEAR] [-d DAYSBACK] [-a] account

 positional arguments:
   account               Name of the account to get jobcharges for. "accounts" command can be used to list your valid accounts.

 options:
   -h, --help            show this help message and exit
   -s STARTTIME, --starttime STARTTIME
                         Get jobcharges after this time. Default is one month before the current time.
   -e ENDTIME, --endtime ENDTIME
                         Get jobcharges before this time. Default is the current time.
   --detail, --details   detail output, per-job
   -m MONTH, --month MONTH
                         Get jobcharges for a specific month (1-12). Will override start end time arguments
   -y YEAR, --year YEAR  Get jobcharges for a specific year. Will override start end time arguments
   -d DAYSBACK, --daysback DAYSBACK
                         Get jobcharges from the previous N days. Will take precedence over all other time search arguments
   -a, --all             Display any job that occured during the queried time regardless of endtime.


Performance tools
-----------------

-  [was a link to NVIDIA Nsight Systems wiki page]

Sample Scripts
-------------------------

-  Serial jobs on CPU nodes

   ::

      $ cat job.slurm
      #!/bin/bash
      #SBATCH --mem=16g
      #SBATCH --nodes=1
      #SBATCH --ntasks-per-node=1
      #SBATCH --cpus-per-task=4    # <- match to OMP_NUM_THREADS
      #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuH100x8
      #SBATCH --account=account_name
      #SBATCH --job-name=myjobtest
      #SBATCH --time=00:10:00      # hh:mm:ss for the job
      ### GPU options ###
      ##SBATCH --gpus-per-node=2
      ##SBATCH --gpu-bind=none     # <- or closest
      ##SBATCH --mail-user=you@yourinstitution.edu
      ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options


      module reset # drop modules and explicitly load the ones needed
                   # (good job metadata and reproducibility)
                   # $WORK and $SCRATCH are now set
      module load python  # ... or any appropriate modules
      module list  # job documentation and metadata
      echo "job is starting on `hostname`"
      srun python3 myprog.py

   | 

-  MPI on CPU nodes

   ::

      #!/bin/bash
      #SBATCH --mem=16g
      #SBATCH --nodes=2
      #SBATCH --ntasks-per-node=32
      #SBATCH --cpus-per-task=2    # <- match to OMP_NUM_THREADS
      #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuH100x8
      #SBATCH --account=account_name
      #SBATCH --job-name=mympi
      #SBATCH --time=00:10:00      # hh:mm:ss for the job
      ### GPU options ###
      ##SBATCH --gpus-per-node=2
      ##SBATCH --gpu-bind=none     # <- or closest ##SBATCH --mail-user=you@yourinstitution.edu
      ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

      module reset # drop modules and explicitly load the ones needed
                   # (good job metadata and reproducibility)
                   # $WORK and $SCRATCH are now set
      module load gcc/11.2.0 openmpi  # ... or any appropriate modules
      module list  # job documentation and metadata
      echo "job is starting on `hostname`"
      srun osu_reduce

   | 

-  OpenMP on CPU nodes

   ::

      #!/bin/bash
      #SBATCH --mem=16g
      #SBATCH --nodes=1
      #SBATCH --ntasks-per-node=1
      #SBATCH --cpus-per-task=32   # <- match to OMP_NUM_THREADS
      #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuH100x8
      #SBATCH --account=account_name
      #SBATCH --job-name=myopenmp
      #SBATCH --time=00:10:00      # hh:mm:ss for the job
      ### GPU options ###
      ##SBATCH --gpus-per-node=2
      ##SBATCH --gpu-bind=none     # <- or closest
      ##SBATCH --mail-user=you@yourinstitution.edu
      ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

      module reset # drop modules and explicitly load the ones needed
                   # (good job metadata and reproducibility)
                   # $WORK and $SCRATCH are now set
      module load gcc/11.2.0  # ... or any appropriate modules
      module list  # job documentation and metadata
      echo "job is starting on `hostname`"
      export OMP_NUM_THREADS=32
      srun stream_gcc

   | 

-  Hybrid (MPI + OpenMP or MPI+X) on CPU nodes

   ::

      #!/bin/bash
      #SBATCH --mem=16g
      #SBATCH --nodes=2
      #SBATCH --ntasks-per-node=4
      #SBATCH --cpus-per-task=4    # <- match to OMP_NUM_THREADS
      #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuH100x8
      #SBATCH --account=account_name
      #SBATCH --job-name=mympi+x
      #SBATCH --time=00:10:00      # hh:mm:ss for the job
      ### GPU options ###
      ##SBATCH --gpus-per-node=2
      ##SBATCH --gpu-bind=none     # <- or closest
      ##SBATCH --mail-user=you@yourinstitution.edu
      ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

      module reset # drop modules and explicitly load the ones needed
                   # (good job metadata and reproducibility)
                   # $WORK and $SCRATCH are now set
      module load gcc/11.2.0 openmpi # ... or any appropriate modules
      module list  # job documentation and metadata
      echo "job is starting on `hostname`"
      export OMP_NUM_THREADS=4
      srun xthi

   | 

-  4 gpus together on a compute node

   ::

      #!/bin/bash
      #SBATCH --job-name="a.out_symmetric"
      #SBATCH --output="a.out.%j.%N.out"
      #SBATCH --partition=gpuH100x8
      #SBATCH --mem=208G
      #SBATCH --nodes=1
      #SBATCH --ntasks-per-node=4  # could be 1 for py-torch
      #SBATCH --cpus-per-task=16   # spread out to use 1 core per numa, set to 64 if tasks is 1
      #SBATCH --constraint="scratch"
      #SBATCH --gpus-per-node=4
      #SBATCH --gpu-bind=closest   # select a cpu close to gpu on pci bus topology
      #SBATCH --account=bbjw-tgirails
      #SBATCH --exclusive  # dedicated node for this job
      #SBATCH --no-requeue
      #SBATCH -t 04:00:00

      export OMP_NUM_THREADS=1  # if code is not multithreaded, otherwise set to 8 or 16
      srun -N 1 -n 4 ./a.out > myjob.out
      # py-torch example, --ntasks-per-node=1 --cpus-per-task=64
      # srun python3 multiple_gpu.py

   | 

-  Parametric / Array / HTC jobs

Interactive Sessions
-------------------------

Interactive sessions can be implemented in several ways depending on
what is needed.

To start up a bash shell terminal on a cpu or gpu node

-  single core with 16GB of memory, with one task on a CPU node

::

   srun --account=<account_name> --partition=cpu \
     --nodes=1 --tasks=1 --tasks-per-node=1 \
     --cpus-per-task=4 --mem=16g --pty bash

-  single core with 20GB of memory, with one task on a GPU node

::

   srun --account=<account_name> --partition=gpu \
     --nodes=1 --gpus-per-node=1 --tasks=1 --tasks-per-node=16 \
     --cpus-per-task=1 --mem=20g --pty bash

| 

MPI interactive jobs: use salloc followed by srun

Since interactive jobs are already a child process of srun, one cannot
srun (or mpirun) applications from within them. Within standard batch
jobs submitted via sbatch, use *srun* to launch MPI codes. For true
interactive MPI, use salloc in place of srun shown above, then "srun
my_mpi.exe" after you get a prompt from salloc ( exit to end the salloc
interactive allocation).

| 

::

   [arnoldg@dt-login01 collective]$ cat osu_reduce.salloc
   salloc --account=bbka-delta-cpu --partition=cpu-interactive \
     --nodes=2 --tasks-per-node=4 \
     --cpus-per-task=2 --mem=0

   [arnoldg@dt-login01 collective]$ ./osu_reduce.salloc
   salloc: Pending job allocation 1180009
   salloc: job 1180009 queued and waiting for resources
   salloc: job 1180009 has been allocated resources
   salloc: Granted job allocation 1180009
   salloc: Waiting for resource configuration
   salloc: Nodes cn[009-010] are ready for job
   [arnoldg@dt-login01 collective]$ srun osu_reduce

   # OSU MPI Reduce Latency Test v5.9
   # Size       Avg Latency(us)
   4                       1.76
   8                       1.70
   16                      1.72
   32                      1.80
   64                      2.06
   128                     2.00
   256                     2.29
   512                     2.39
   1024                    2.66
   2048                    3.29
   4096                    4.24
   8192                    2.36
   16384                   3.91
   32768                   6.37
   65536                  10.49
   131072                 26.84
   262144                198.38
   524288                342.45
   1048576               687.78
   [arnoldg@dt-login01 collective]$ exit
   exit
   salloc: Relinquishing job allocation 1180009
   [arnoldg@dt-login01 collective]$ 

Interactive X11 Support
~~~~~~~~~~~~~~~~~~~~~~~

To run an X11 based application on a compute node in an interactive
session, the use of the ``--x11`` switch with ``srun`` is needed. For
example, to run a single core job that uses 16g of memory with X11 (in
this case an xterm) do the following:

::

   srun -A <account_name> --partition=cpu \
     --nodes=1 --tasks=1 --tasks-per-node=1 \
     --cpus-per-task=2 --mem=16g --x11  xterm

.. _file-system-dependency-specification-for-jobs-1:

Job Management
-----------------

Batch jobs are submitted through a *job script* (as in the examples
above) using the ``sbatch`` command. Job scripts generally start with a
series of SLURM *directives* that describe requirements of the job (such
as number of nodes, wall time required, etc…) to the batch
system/scheduler (SLURM directives can also be specified as options on
the sbatch command line; command line options take precedence over those
in the script). The rest of the batch script consists of user commands.

The syntax for ``sbatch`` is:

**sbatch** [list of sbatch options] script_name

Refer to the sbatch man page for detailed information on the options.

squeue/scontrol/sinfo
^^^^^^^^^^^^^^^^^^^^^

Commands that display batch job and partition information:

.. table:: Common squeue, scontrol, and sinfo Commands

   +-------------------------+-------------------------------------------+
   | SLURM EXAMPLE COMMAND   | DESCRIPTION                               |
   +=========================+===========================================+
   | squeue -a               | List the status of all jobs on the        |
   |                         | system.                                   |
   +-------------------------+-------------------------------------------+
   | squeue -u $USER         | List the status of all your jobs in the   |
   |                         | batch system.                             |
   +-------------------------+-------------------------------------------+
   | squeue -j JobID         | List nodes allocated to a running job in  |
   |                         | addition to basic information..           |
   +-------------------------+-------------------------------------------+
   | scontrol show job JobID | List detailed information on a particular |
   |                         | job.                                      |
   +-------------------------+-------------------------------------------+
   | sinfo -a                | List summary information on all the       |
   |                         | partitions.                               |
   +-------------------------+-------------------------------------------+

See the manual (man) pages for other available options for the commands above.

**srun**

The srun command initiates an interactive job on compute nodes.

For example, the following command:

::

   srun -A <account_name> --time=00:30:00 --nodes=1 --ntasks-per-node=16 \
   --partition=gpu --gpus=1 --mem=16g --pty bash

will run an interactive job in the gpu partition with a wall clock
limit of 30 minutes, using one node and 16 cores per node and 1 gpu. You
can also use other sbatch options such as those documented above.

After you enter the command, you will have to wait for SLURM to start
the job. As with any job, your interactive job will wait in the queue
until the specified number of nodes is available. If you specify a small
number of nodes for smaller amounts of time, the wait should be shorter
because your job will backfill among larger jobs. 

.. You will see something like this:

.. ``srun: job 123456 queued and waiting for resources``

.. Once the job starts, you will see:

.. ``srun: job 123456 has been allocated resources``

.. THE MESSAGES ABOVE DO NOT SEEM TO BE ISSUED ON RAILS

Once the job starts, you will be presented with an interactive shell prompt on the launch
node. At this point, you can use the appropriate command to start your
program. When you are done with your work, you can use the *exit* command to end
the job.

**scancel**

The scancel command deletes a queued job or terminates a running job.

-  scancel JobID deletes/terminates a job.

Job Status
-----------------

NODELIST(REASON)

MaxGRESPerAccount - a user has exceeded the number of cores or gpus
allotted per user or project for a given partition.


.. table:: Useful Batch Job Environment Variables

   +--------------+----------------------------+-------------------------------------+
   | DESCRIPTION  | SLURM ENVIRONMENT VARIABLE | DETAIL DESCRIPTION                  |
   +==============+============================+=====================================+
   | JobID        | $SLURM_JOB_ID              | Job identifier assigned to the job. |
   +--------------+----------------------------+-------------------------------------+
   | Job          | $SLURM_SUBMIT_DIR          | By default, jobs start in the       |
   | Submision    |                            | directory that the job was submitted|
   | Directory    |                            | from. So the "cd $SLURM_SUBMIT_DIR" |
   |              |                            | command is not needed.              |
   +--------------+----------------------------+-------------------------------------+
   | Machine(node)| $SLURM_NODELIST            | Variable name that contains the list|
   | list         |                            | of nodes assigned to the batch job. |
   +--------------+----------------------------+-------------------------------------+
   | Array JobID  | $SLURM_ARRAY_JOB_ID        | Each member of a job array is       |
   |              |                            | assigned a unique identifier.       |
   |              | $SLURM_ARRAY_TASK_ID       |                                     |
   +--------------+----------------------------+-------------------------------------+

See the sbatch man page for additional environment variables available.


Accessing the Compute Nodes
-------------------------------

TGI RAILS implements the Slurm batch environment to manage access to the
compute nodes. Use the Slurm commands to run batch jobs or for
interactive access to compute nodes. See:
`Slurm Quick Start User Guide <https://slurm.schedmd.com/quickstart.html>`_ for an introduction to Slurm. 
There are two ways to access compute nodes on TGI RAILS.

Batch jobs can be used to access compute nodes. Slurm provides a
convenient direct way to submit batch jobs. See
`Slurm Submitting Jobs <https://slurm.schedmd.com/heterogeneous_jobs.html#submitting>`_ for
details. Slurm supports job arrays for easy management of a set of
similar jobs,
see: `Slurm Job Array Support <https://slurm.schedmd.com/job_array.html>`_.

Sample Slurm batch job scripts are provided in the *Sample Scripts* section above.

Direct ssh access to a compute node in a running batch job from a
login node is enabled, once the job has started.

::

   $ squeue -u <username>
                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                21130       cpu     bash  cmendes  R       1:02      1 rails01
 
Then in a terminal session in the login node:

::

   [cmendes@railsl1 ~]$ ssh rails01
   [cmendes@rails01 ~]$ hostname
   rails01
   [cmendes@rails01 ~]$ <other_commands>  

See also:

Scheduler
-------------

**For information, consult:**

`Slurm Quick Start User Guide <https://slurm.schedmd.com/quickstart.html>`_

..   250 slurm quick reference guide

Partitions (Queues)
-----------------------

.. table:: Delta Production Default Partition Values

   ======================= ==========
   Property                Value
   ======================= ==========
   Default Memory per core 1000 MB
   Default Wallclock time  30 minutes
   ======================= ==========

.. table:: TGI RAILS Production Partitions/Queues

   +----------------------+----------+----------+----------+--------------+----------+
   | Partition/Queue      | Node Type| Max Nodes| Max      | Max          | Charge   |
   |                      |          | per Job  | Duration | Running      | Factor   |
   |                      |          |          |          | in Queue/user|          |
   +======================+==========+==========+==========+==============+==========+
   | cpu                  | CPU      | TBD      | 48 hr    | TBD          | 1.0      |
   +----------------------+----------+----------+----------+--------------+----------+
   | cpu-interactive      | CPU      | TBD      | 30 min   | TBD          | 2.0      |
   +----------------------+----------+----------+----------+--------------+----------+
   | gpuH100x8            | octa-H100| TBD      | 48 hr    | TBD          | 1.5      |
   +----------------------+----------+----------+----------+--------------+----------+
   | gpuH100x8-interactive| octa-H100| TBD      | 1 hr     | TBD          | 3.0      |
   +----------------------+----------+----------+----------+--------------+----------+

sview view of slurm partitions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Node Policies
~~~~~~~~~~~~~

Node-sharing is the default for jobs. Node-exclusive mode can be
obtained by specifying all the consumable resources for that node type
or adding the following Slurm options:

::

   --exclusive --mem=0

GPU NVIDIA MIG (GPU slicing) for the H100 may be supported at a future
date.

Pre-emptive jobs will be supported at a future date.

Job Policies
----------------

The default job requeue or restart policy is set to not allow jobs to be
automatically requeued or restarted.

To enable automatic requeue and restart of a job by slurm, please add
the following slurm directive

::

   --requeue 

When a job is requeued due to an evant like a node failure, thebatch
script is initiated from its beginning. Job scripts need to be written
to handle automatically restarting from checkpoints etc.

Monitoring a Node During a Job
---------------------------------

Refunds
------------

Refunds are considered, when appropriate, for jobs that failed due to
circumstances beyond user control.

Projects wishing to request a refund should email
help+tgi@ncsa.illinois.edu. Please include the batch job ids and the
standard error and output files produced by the job(s).

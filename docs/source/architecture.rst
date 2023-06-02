System Architecture
=======================

Compute Nodes
----------------------

The TGI-RAILS compute ecosystem is composed of three node types:

#. Dual-socket CPU-only login nodes
#. Dual-socket CPU-only compute nodes
#. Dual-socket 8-way NVIDIA H100 GPU compute nodes

All processors are Intel Sapphire Rapids CPUs.

Table. Login Node Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================= ===================
Specification             Value
Model                     Dell PowerEdge R660
Number of nodes           2
CPU                       Intel Sapphire Rapids 6426Y
                          (PCIe Gen5)
Sockets per node          2
Cores per socket          16
Cores per node            32
Hardware threads per core 2
Hardware threads per node 64
Clock rate (GHz)          ~ 2.50
RAM (GB)                  256
Cache (KB) L1/L2/L3       37.5MB
========================= ===================

Table. CPU Compute Node Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================= ===================
Specification             Value
Model                     Dell PowerEdge R760
Number of nodes           3
CPU                       Intel Sapphire Rapids 8468
                          (PCIe Gen5)
Sockets per node          2
Cores per socket          48
Cores per node            96
Hardware threads per core 2
Hardware threads per node 192
Clock rate (GHz)          ~ 2.10
RAM (GB)                  512
Cache (KB) L1/L2/L3       105MB
Local storage (TB)        1.92 TB
========================= ===================

Table. 8-way NVIDIA H100 GPU Large Memory Compute Node Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+---------------------------+-----------------------------------------+
| Specification             | Value                                   |
+---------------------------+-----------------------------------------+
| Model                     | Dell XE9680                             |
+---------------------------+-----------------------------------------+
| Number of nodes           | 3                                       |
+---------------------------+-----------------------------------------+
| GPU                       | NVIDIA H100                             |
|                           | (`Vendor                                |
|                           | page <https://www.nvidia.com/en-u       |
|                           | s/data-center/h100/>`__)                |
+---------------------------+-----------------------------------------+
| GPUs per node             | 8                                       |
+---------------------------+-----------------------------------------+
| GPU Memory (GB)           | 80                                      |
+---------------------------+-----------------------------------------+
| CPU                       | Intel Sapphire Rapids                   |
+---------------------------+-----------------------------------------+
| CPU sockets per node      | 2                                       |
+---------------------------+-----------------------------------------+
| Cores per socket          | 48                                      |
+---------------------------+-----------------------------------------+
| Cores per node            | 96                                      |
+---------------------------+-----------------------------------------+
| Hardware threads per core | 2                                       |
+---------------------------+-----------------------------------------+
| Hardware threads per node | 192                                     |
+---------------------------+-----------------------------------------+
| Clock rate (GHz)          | ~ 2.10                                  |
+---------------------------+-----------------------------------------+
| RAM (GB)                  | 2,048                                   |
+---------------------------+-----------------------------------------+
| Cache (KB) L1/L2/L3       | 105MB                                   |
+---------------------------+-----------------------------------------+
| Local storage (TB)        | 3.84 B                                  |
+---------------------------+-----------------------------------------+

The Intel CPUs are set for 4 NUMA domains per socket (NPS=4).
*this needs updating*
Table. 8-way NVIDIA H100 Mapping and GPU-CPU Affinitization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
|      | GPU0 | GPU1 | GPU2 | GPU3 | GPU4 | GPU5 | GPU6 | GPU7 | HSN | CPU Affinity | NUMA Affinity |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU0 | X    | NV12 | NV12 | NV12 | NV12 | NV12 | NV12 | NV12 | SYS | 48-63        | 3             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU1 | NV12 | X    | NV12 | NV12 | NV12 | NV12 | NV12 | NV12 | SYS | 48-63        | 3             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU2 | NV12 | NV12 | X    | NV12 | NV12 | NV12 | NV12 | NV12 | SYS | 16-31        | 1             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU3 | NV12 | NV12 | NV12 | X    | NV12 | NV12 | NV12 | NV12 | SYS | 16-31        | 1             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU4 | NV12 | NV12 | NV12 | NV12 | X    | NV12 | NV12 | NV12 | SYS | 112-127      | 7             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU5 | NV12 | NV12 | NV12 | NV12 | NV12 | X    | NV12 | NV12 | SYS | 112-127      | 7             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU6 | NV12 | NV12 | NV12 | NV12 | NV12 | NV12 | X    | NV12 | SYS | 80-95        | 5             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| GPU7 | NV12 | NV12 | NV12 | NV12 | NV12 | NV12 | NV12 | X    | SYS | 80-95        | 5             |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+
| HSN  | SYS  | SYS  | SYS  | SYS  | SYS  | SYS  | SYS  | SYS  | X   |              |               |
+------+------+------+------+------+------+------+------+------+-----+--------------+---------------+

Table Legend

X = Self
SYS = Connection traversing PCIe as well as the SMP interconnect between
NUMA nodes (e.g., QPI/UPI)
NODE = Connection traversing PCIe as well as the interconnect between
PCIe Host Bridges within a NUMA node
PHB = Connection traversing PCIe as well as a PCIe Host Bridge
(typically the CPU)
NV# = Connection traversing a bonded set of # NVLinks


Login Nodes
--------------
Login nodes provide interactive support for code compilation.

Specialized Nodes
---------------------
TGI-RAILS will support data transfer nodes (serving the "NCSA Delta" Globus
collection) and nodes in support of other services.

Network
------------
TGI-RAILS is connected to the NPCF core router & exit infrastructure via two
100Gbps connections, NCSA's 400Gbps+ of WAN connectivity carry traffic
to/from users on an optimal peering.

TGI-RAILs resources are inter-connected with 100Gbps Ethernet.

File Systems
---------------

Need to descirbe the VAST storage system and how it is presented to the system.

Taiga
Taiga is NCSA’s global file system which provides users with their $WORK
area. This file system is mounted across all Delta systems at /taiga
(note that Taiga is used to provision the Delta /projects file system
from /taiga/nsf/delta ) and is accessible on both the Delta and Taiga
DTN endpoints. For NCSA & Illinois researchers, Taiga is also mounted
across NCSA's HAL, HOLL-I, and Radiant compute environments. This
storage subsystem has an aggregate performance of 110GB/s and 1PB of its
capacity allocated to users of the Delta system. /taiga is a Lustre file
system running DDN's Exascaler 6 Lustre stack. See the Taiga and Granite
NCSA wiki site for more information.

*Hardware:
*\ DDN SFA400NVXE (Quantity: 2), each unit contains

-  4 x SS9012 enclosures
-  NVME for metadata and small files

DDN SFA18XE (Quantity: 1), each unit contains

-  10 x SS9012 enclosures
-  NVME for for metadata and small files

$WORK and $SCRATCH

A "module reset" in a job script will populate $WORK and $SCRATCH
environment variables automatically, or you may set them as
WORK=/projects/<account>/$USER , SCRATCH=/scratch/<account>/$USER .

| 

+-------------+-------------+-------------+-------------+-------------+
| **File      | **Quota**   | **          | **Purged**  | **Key       |
| System**    |             | Snapshots** |             | Features**  |
+-------------+-------------+-------------+-------------+-------------+
| HOME (/u)   | **25GB.**   | No/TBA      | No          | Area for    |
|             | 400,000     |             |             | software,   |
|             | files per   |             |             | scripts,    |
|             | user.       |             |             | job files,  |
|             |             |             |             | etc.        |
|             |             |             |             | **NOT**     |
|             |             |             |             | intended as |
|             |             |             |             | a           |
|             |             |             |             | source/     |
|             |             |             |             | destination |
|             |             |             |             | for I/O     |
|             |             |             |             | during jobs |
+-------------+-------------+-------------+-------------+-------------+
| WORK        | **500 GB**. | No/TBA      | No          | Area for    |
| (/projects) | Up to 1-25  |             |             | shared data |
|             | TB by       |             |             | for a       |
|             | allocation  |             |             | project,    |
|             | request.    |             |             | common data |
|             | Large       |             |             | sets,       |
|             | requests    |             |             | software,   |
|             | may have a  |             |             | results,    |
|             | monetary    |             |             | etc.        |
|             | fee.        |             |             |             |
+-------------+-------------+-------------+-------------+-------------+
| SCRATCH     | **1000      | No          | Yes**.      | Area for    |
| (/scratch)  | GB**. Up to |             | Purging is  | c           |
|             | 1-100 TB by |             | based on a  | omputation, |
|             | allocation  |             | 30-day last | largest     |
|             | request.    |             | access      | a           |
|             |             |             | policy.     | llocations, |
|             |             |             | \*\*        | where I/O   |
|             |             |             | Purging is  | from jobs   |
|             |             |             | not         | should      |
|             |             |             | currently   | occur       |
|             |             |             | enabled but |             |
|             |             |             | will be     |             |
|             |             |             | when        |             |
|             |             |             | warranted,  |             |
|             |             |             | with a      |             |
|             |             |             | 30-day      |             |
|             |             |             | notice.     |             |
+-------------+-------------+-------------+-------------+-------------+
| /tmp        | **0.74      | No          | After each  | Locally     |
|             | (CPU) or    |             | job         | attached    |
|             | 1.50 TB     |             |             | disk for    |
|             | (GPU)**     |             |             | fast small  |
|             | shared or   |             |             | file IO.    |
|             | dedicated   |             |             |             |
|             | depending   |             |             |             |
|             | on node     |             |             |             |
|             | usage by    |             |             |             |
|             | job(s), no  |             |             |             |
|             | quotas in   |             |             |             |
|             | place       |             |             |             |
+-------------+-------------+-------------+-------------+-------------+

quota usage
           

The **quota** command allows you to view your use of the file systems
and use by your projects. Below is a sample output for a person "user"
who is in two projects: aaaa, and bbbb. The home directory quota does
not depend on which project group the file is written with.

::

   @dt-login01 ~]$ quota
   Quota usage for user :
   -------------------------------------------------------------------------------------------
   | Directory Path | User | User | User  | User | User   | User |
   |                | Block| Soft | Hard  | File | Soft   | Hard |
   |                | Used | Quota| Limit | Used | Quota  | Limit|
   --------------------------------------------------------------------------------------
   | /u/      | 20k  | 25G  | 27.5G | 5    | 300000 | 330000 |
   --------------------------------------------------------------------------------------
   Quota usage for groups user  is a member of:
   -------------------------------------------------------------------------------------
   | Directory Path | Group | Group | Group | Group | Group  | Group |
   |                | Block | Soft  | Hard  | File  | Soft   | Hard  |
   |                | Used  | Quota | Limit | Used  | Quota  | Limit |
   -------------------------------------------------------------------------------------------
   | /projects/aaaa | 8k    | 500G  | 550G  | 2     | 300000 | 330000 |
   | /projects/bbbb | 24k   | 500G  | 550G  | 6     | 300000 | 330000 |
   | /scratch/aaaa  | 8k    | 552G  | 607.2G| 2     | 500000 | 550000 |
   | /scratch/bbbb  | 24k   | 9.766T| 10.74T| 6     | 500000 | 550000 |
   ------------------------------------------------------------------------------------------

File System Dependency Specification for Jobs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We request that jobs specify file system or systems being used in order
for us to respond to resource availability issues. We assume that all
jobs depend on the HOME file system.

Table of Slurm Feature/constraint labels

================= ======================== ==================
File system       Feature/constraint label Note
WORK (/projects)  projects                 
SCRACH (/scratch) scratch                  
IME (/ime)        ime                      depends on scratch
TAIGA (/taiga)    taiga                    
================= ======================== ==================

The Slurm constraint specifier and slurm Feature attribute for jobs are
used to add file system dependencies to a job.

Slurm Feature Specification
^^^^^^^^^^^^^^^^^^^^^^^^^^^

For already submitted and pending (PD) jobs, please use the Slurm
Feature attribute as follows:

::

   $ scontrol update job=JOBID Features="feature1&feature2"]]>
         For already submitted and pending (PD) jobs, please use the Slurm Feature attribute as follows:

   $ scontrol update job=JOBID Features="feature1&feature2"

For example, to add scratch and ime Features to an already submitted
job:

::

   $ scontrol update job=713210 Features="scratch&ime"]]>
         For example, to add scratch and ime Features to an already submitted job:

   $ scontrol update job=713210 Features="scratch&ime"

To verify the setting:

::

   $ scontrol show job 713210 | grep Feature
      Features=scratch&ime DelayBoot=00:00:00

Slurm constraint Specification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To add Slurm job constraint attributes when submitting a job with sbatch
(or with srun as a command line argument) use the following:

::

   #SBATCH --constraint="constraint1&constraint2.."]]>
         To add Slurm job constraint attributes when submitting a job with sbatch (or with srun as a command line argument) use the following:

   #SBATCH --constraint="constraint1&constraint2.."

For example, to add scratch and ime constraints to when submitting a
job:

::

   #SBATCH --constraint="scratch&ime"]]>
         For example, to add scratch and ime constraints to when submitting a job:

   #SBATCH --constraint="scratch&ime"

To verify the setting:

::

   $ scontrol show job 713267 | grep Feature
      Features=scratch&ime DelayBoot=00:00:00

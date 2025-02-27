System Architecture
=======================

Compute Nodes
----------------------

TGI RAILS is made up of a total of 8 nodes of three node types:

- 2 Dual-socket CPU-only login nodes
- 3 Dual-socket CPU-only compute nodes
- 3 Dual-socket 8-way NVIDIA H100 GPU compute nodes

All processors are Intel Sapphire Rapids CPUs and all have hardware multithreading turned on.

Login Node Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Login nodes provide interactive support for code editing, compilation and job submission. Login 
nodes do not contain GPUs and are not intended for computationally intensive workloads. See our 
:ref:`login node policy <citizenship>` for more information.

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
Cache L1/L2/L3            48KB / 2MB / 37.5MB
========================= ===================

CPU Compute Node Specifications
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
Cache L1/L2/L3            48KB (p/core) / 2MB (p/core) / 105MB (shared)
Local storage (TB)        1.92 TB
========================= ===================

GPU Compute Node Specifications
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
| CPU                       | Intel Sapphire Rapids 8468              |
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
| Cache L1/L2/L3            | 48KB(p/core)/ 2MB(p/core)/ 105MB(shared)|
+---------------------------+-----------------------------------------+
| Local storage (TB)        | 3.84 TB                                 |
+---------------------------+-----------------------------------------+

Network
------------
TGI RAILS is connected to the NPCF core router & exit infrastructure via two
100Gbps connections, NCSA's 400Gbps+ of WAN connectivity carry traffic
to/from users on an optimal peering.

TGI-RAILS resources are inter-connected with 100Gbps Ethernet.

Storage (File Systems)
-----------------------

TGI RAILS has two primary file systems, Home and Projects. Both are powered by the VAST storage system.

**Need to describe the VAST storage system and how it is presented to the system.**
*Hardware:
VAST 1x1 system with 330TB of flash storage.

$WORK and $SCRATCH

A "module reset" in a job script will populate $WORK
environment variables automatically, or you may set them as
WORK=/projects/<account>/$USER .

+-----------------+---------------------+--------------+------------+-----------------------------+
| **File System** | **Total Capacity**  | **Default    | **Purged** | **Description**             |
|                 |                     | User Quota** |            |                             |
+-----------------+---------------------+--------------+------------+-----------------------------+
| HOME (/u)       | 560 TB Raw, ~1.7 PB | 18.5 TB      | Never      | User home directory, Area   |
|                 | accessible via VAST |              |            | for software, scripts, job  |
|                 | compression.        |              |            | files, etc.                 |
+-----------------+---------------------+--------------+------------+-----------------------------+
| WORK (/projects)| 560 TB Raw, ~1.7 PB | 37.185 TB    | Never      | Area for shared data for a  |
|                 | accessible via VAST |              |            | project, common data sets,  |
|                 | compression.        |              |            | software, results, etc.     |
+-----------------+---------------------+--------------+------------+-----------------------------+
| /tmp            | 1.92 TB CPU Node,   | None         | After each | Locally attached disk for   |
|                 | 3.84 TB GPU Node    |              | job        | fast small file IO.         |
+-----------------+---------------------+--------------+------------+-----------------------------+

System Architecture
=======================

Compute Nodes
----------------------

The TGI RAILS compute ecosystem is composed of three node types:

#. Dual-socket CPU-only login nodes
#. Dual-socket CPU-only compute nodes
#. Dual-socket 8-way NVIDIA H100 GPU compute nodes (delayed, A100 nodes avaialble temporarily)

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
Login Nodes
--------------
Login nodes provide interactive support for code compilation.

Specialized Nodes
---------------------
TGI RAILS will support data transfer nodes (serving the "TGI RAILS" Globus
collection) and nodes in support of other services.

Network
------------
TGI RAILS is connected to the NPCF core router & exit infrastructure via two
100Gbps connections, NCSA's 400Gbps+ of WAN connectivity carry traffic
to/from users on an optimal peering.

TGI-RAILs resources are inter-connected with 100Gbps Ethernet.

File Systems
---------------

Need to describe the VAST storage system and how it is presented to the system.

*Hardware:
VAST 1x1 system with 330TB of flash storage.

$WORK and $SCRATCH

A "module reset" in a job script will populate $WORK
environment variables automatically, or you may set them as
WORK=/projects/<account>/$USER .

| 

+-------------+-------------+-------------+-------------+-------------+
| **File      | **Quota**   | **          | **Purged**  | **Key       |
| System**    |             | Snapshots** |             | Features**  |
+-------------+-------------+-------------+-------------+-------------+
| HOME (/u)   | **5TB.**    | No/TBA      | No          | Area for    |
|             |             |             |             | software,   |
|             |             |             |             | scripts,    |
|             |             |             |             | job files,  |
|             |             |             |             | etc.        |
|             |             |             |             | **NOT**     |
|             |             |             |             | intended as |
|             |             |             |             | a           |
|             |             |             |             | source/     |
|             |             |             |             | destination |
|             |             |             |             | for I/O     |
|             |             |             |             | during jobs |
+-------------+-------------+-------------+-------------+-------------+
| WORK        | **50 TB**.  | No/TBA      | No          | Area for    |
| (/projects) | Up to 1-25  |             |             | shared data |
|             | TB by       |             |             | for a       |
|             | allocation  |             |             | project,    |
|             |             |             |             | common data |
|             |             |             |             | sets,       |
|             |             |             |             | software,   |
|             |             |             |             | results,    |
|             |             |             |             | etc.        |
|             |             |             |             |             |
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
   ------------------------------------------------------------------------------------------

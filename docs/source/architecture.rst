System Architecture
=======================

Compute Nodes
----------------------

The TGI RAILS compute ecosystem is composed of three node types:

#. Dual-socket CPU-only login nodes
#. Dual-socket CPU-only compute nodes
#. Dual-socket 8-way NVIDIA H100 GPU compute nodes

All processors are Intel Sapphire Rapids CPUs and all have hardware multithreading turned on.

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
Cache L1/L2/L3            48KB (p/core) / 2MB (p/core) / 105MB (shared)
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

Login Nodes
--------------
Login nodes provide interactive support for code editing and compilation.

Specialized Nodes
---------------------
TGI RAILS will support data transfer nodes (serving the "TGI RAILS" Globus
collection) and nodes in support of other services.

Network
------------
TGI RAILS is connected to the NPCF core router & exit infrastructure via two
100Gbps connections, NCSA's 400Gbps+ of WAN connectivity carry traffic
to/from users on an optimal peering.

TGI-RAILS resources are inter-connected with 100Gbps Ethernet.

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
| /tmp        | **1.92      | No          | After each  | Locally     |
|             | (CPU) or    |             | job         | attached    |
|             | 3.84 TB     |             |             | disk for    |
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
           
The storage system does enforce quotas. Details on querying quotas and storage usage will be posted soon.

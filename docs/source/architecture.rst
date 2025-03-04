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

.. table:: Login Node Specs

   ========================= ===================
   Specification             Value
   ========================= ===================
   Model                     Dell PowerEdge R660
   Number of nodes           2
   CPU                       Intel Sapphire Rapids 6426Y (PCIe Gen5)            
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

.. table:: CPU Compute Node Specs

   ========================= ===================
   Specification             Value
   ========================= ===================
   Model                     Dell PowerEdge R760
   Number of nodes           3
   CPU                       Intel Sapphire Rapids 8468 (PCIe Gen5)
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

.. table:: GPU Compute Node Specs

   +---------------------------+-----------------------------------------+
   | Specification             | Value                                   |
   +===========================+=========================================+
   | Model                     | Dell XE9680                             |
   +---------------------------+-----------------------------------------+
   | Number of nodes           | 3                                       |
   +---------------------------+-----------------------------------------+
   | GPU                       | `NVIDIA H100 <https://www.nvidia.com/en |
   |                           | -us/data-center/h100/>`_                |
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

RAILS storage is powered by the VAST storage system, an all-flash unified storage solution that 
provides a total raw capacity of 560 TB. With data-aware file compression, the effective capacity 
of the VAST system is augmented to approximately 1.7 PB. It boasts impressive performance 
capabilities, delivering 37 GB/s read and 6 GB/s write speeds, with 200,000 IOPS, ensuring 
efficient and rapid access to stored data. This system includes two primary file systems: Home and 
Projects which share the same storage capacity.

.. table:: File System Specs
   :widths: 15 25 15 15 30

   +-----------------+---------------------+--------------+------------+-----------------------------+
   | File System     | Total Capacity      | Default      | Purged     | Description                 |
   |                 |                     | User Quota   |            |                             |
   +=================+=====================+==============+============+=============================+
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

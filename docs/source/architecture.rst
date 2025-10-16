System Architecture
=======================

.. Note::
   TGI RAILS is expanding to include 9 NVIDIA A100 GPU compute nodes soon. While not available for 
   use yet, the details of these nodes are listed here, and are expected to be available by Q1 2026.

Compute Nodes
----------------------

TGI RAILS is made up of a total of 8 nodes of three node types:

- 2 Dual-socket CPU-only login nodes
- 3 Dual-socket CPU-only compute nodes
- 3 Dual-socket 8-way NVIDIA H100 GPU compute nodes
- 9 Dual-socket 2-way NVIDIA A100 GPU compute nodes (Coming Soon Q1 2026)

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
   CPU                       Intel Sapphire Rapids 6426Y           
   Sockets per node          2
   Cores per socket          16
   Cores per node            32
   Hardware threads per core 2
   Hardware threads per node 64
   Clock rate                ~ 2.50 GHz
   RAM                       256 GB
   Cache L1/L2/L3            48KB / 2MB / 37.5MB
   Interconnect              2 x 100GBe (25GB/s)
   ========================= ===================

CPU Compute Node Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. table:: CPU Compute Node Specs

   ========================= ===================
   Specification             Value
   ========================= ===================
   Model                     Dell PowerEdge R760
   Number of nodes           3
   CPU                       Intel Sapphire Rapids 8468
   Sockets per node          2
   Cores per socket          48
   Cores per node            96
   Hardware threads per core 2
   Hardware threads per node 192
   Clock rate                ~ 2.10 GHz
   RAM                       512 GB
   Cache L1/L2/L3            48KB (p/core) / 2MB (p/core) / 105MB (shared)
   Local storage             1.92 TB NVME
   Interconnect              2 x 100GBe (25GB/s)
   ========================= ===================

GPU Compute Node Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. table:: H100 GPU Node Specs
   ========================= ===================
   Specification             Value
   ========================= ===================
   Model                     Dell XE9680  
   Number of nodes           3
   GPU                       `NVIDIA H100 <https://www.nvidia.com/en-us/data-center/h100/>`_ 
   GPUS per node             8
   GPU Memory                80 GB
   CPU                       Intel Sapphire Rapids 8468
   Sockets per node          2
   Cores per socket          48
   Cores per node            96
   Hardware threads per core 2
   Hardware threads per node 192
   Clock rate                 ~ 2.10 GHz
   RAM                       2,048 GB
   Cache L1/L2/L3            48KB (p/core) / 2MB (p/core) / 105MB (shared)
   Local storage             3.84 TB NVME
   Interconnect              4 x 100GBe (50GB/s)
   ========================= ===================

.. table:: A100 GPU Node Specs (Coming Soon Q1 2026)

   ========================= ===================
   Specification             Value
   ========================= ===================
   Model                     Dell PowerEdge R7525
   Number of nodes           7
   CPU                       AMD EPYC CPU 7452 (32 core, Rome) 
   Sockets per node          2
   Cores per socket          32
   Cores per node            64
   Hardware threads per core 1
   Hardware threads per node 64
   Clock rate                ~ 2.35 GHz
   RAM                       256 GB
   Cache L1/L2/L3            32KB (p/core) / 512KB (p/core) / 16MB (shared)
   Local storage             1.5 TB NVME
   Interconnect              2 x 100GBe (25GB/s)
   ========================= ===================

   ========================= ===================
   Specification             Value
   ========================= ===================
   Model                     Dell PowerEdge R7525
   Number of nodes           2
   CPU                       AMD EPYC CPU 7453 (28 core, Milan) 
   Sockets per node          2
   Cores per socket          28
   Cores per node            56
   Hardware threads per core 1
   Hardware threads per node 56
   Clock rate                ~ 2.75 GHz
   RAM                       256 GB
   Cache L1/L2/L3            32KB (p/core) / 512KB (p/core) / 16MB (shared)
   Local storage             1.5 TB NVME
   Interconnect              2 x 100GBe (25GB/s)
   ========================= ===================

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
   :widths: 15 25 15 30

   +-----------------+---------------------+------------+-----------------------------+
   | File System     | Total Capacity      | Purged     | Description                 |
   |                 |                     |            |                             |
   +=================+=====================+============+=============================+
   | HOME (/u)       | 560 TB Raw, ~1.7 PB | Never      | User home directory, Area   |
   |                 | accessible via VAST |            | for software, scripts, job  |
   |                 | compression.        |            | files, etc.                 |
   +-----------------+---------------------+------------+-----------------------------+
   | WORK (/projects)| 560 TB Raw, ~1.7 PB | Never      | Area for shared data for a  |
   |                 | accessible via VAST |            | project, common data sets,  |
   |                 | compression.        |            | software, results, etc.     |
   +-----------------+---------------------+------------+-----------------------------+
   | /tmp            | 1.92 TB CPU Node,   | After each | Locally attached disk for   |
   |                 | 3.84 TB GPU Node    | job        | fast small file IO.         |
   +-----------------+---------------------+------------+-----------------------------+

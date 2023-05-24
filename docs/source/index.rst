################################################
Taylor Geospatial Institute Regional AI Learning System (TGI-RAILS) User Guide
################################################

*TGI-RAILS* is coming later this summer.

System status, planned outages, and maintenance info:

Introduction
=================

*TGI-RAILS* is a regional computing system funded by the NSF Campus Cyberinfrastructure program for primary use by the TGI consortium for geospatial related research. RAILS provides a highly capable GPU-focused compute environment for GPU and CPU workloads.

Delta has two standard CPU nodes and three 8-way NVIDIA H100-based GPU nodes.  Every RAILS node has high-performance node-local SSD storage (740 GB for CPU nodes, 1.5 TB for GPU nodes), and is connected to the 1 PB VAST filesystem via the high-speed interconnect.  The RAILS resource uses the SLURM workload manager for job scheduling.  

Contents
--------

.. toctree::
   :maxdepth: 2
   
   status_updates
   architecture
   fee_overview
   accounts/index
   accessing/index
   citizenship
   file_mgmt/index
   prog_env/index
   running_jobs/index
   software/index
   visualization
   containers
   services/index
   debug_perf/index
   protected_data
   help
   migrate
   

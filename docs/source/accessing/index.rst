Accessing The System
=========================

**Direct Access login_nodes**
-----------------------------

Direct access to the TGI RAILS login nodes is via ssh using your NCSA
username, password and NCSA Duo MFA. Please see this `page <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ for links to NCSA
Identity and NCSA Duo services. The login nodes provide access to the
CPU and GPU resources on TGI RAILS.

+----------------------------------+-----------------------------------------------+
| login node hostname              | example usage with ssh                        |
+----------------------------------+-----------------------------------------------+
| railsl1.ncsa.illinois.edu        | ::                                            |
|                                  |    ssh -Y username@railsl1.ncsa.illinois.edu  |
|                                  |    ( -Y allows X                              |
|                                  | 11 forwarding from linux hosts )              |
+----------------------------------+-----------------------------------------------+
| railsl2.ncsa.illinois.edu        | ::                                            |
|                                  |    ssh -l username railsl2.ncsa.illinois.edu  |
|                                  |    ( -l user                                  |
|                                  | name alt. syntax for user@host )              |
+----------------------------------+-----------------------------------------------+
| Preferred host:                  | ::                                            | 
| rails.ncsa.illinois.edu          |                                               |
|                                  |    ssh username@rails.ncsa.illinois.edu       |
| (round robin DNS name for the    |                                               |
| set of login nodes)              |                                               |
+----------------------------------+-----------------------------------------------+

Contact help@ncsa.illinois.edu for assistance if you do not know your NCSA
username.

Use of ssh-key pairs is disabled for general use. Please contact NCSA
Help at help@ncsa.illinois.edu for key-pair use by Gateway allocations.

maintaining persistent sessions: tmux
--------------------------------------

tmux is available on the login nodes to maintain persistent sessions.
See the tmux man page for more information. Use the targeted login
hostnames (railsl1 or railsl2) to attach to the login node where
you started tmux after making note of the hostname. Avoid the
round-robin hostname when using tmux.

ssh keyboard-interactive
--------------------------------------
For command line ssh clients, make sure to use the following settings if you have trouble logging in to TGI RAILS:

``ssh -o PreferredAuthentications=keyboard-interactive,password``

Compute Node External Connectivity
---------------------------------------
Compute nodes are able to contact the WAN directly but do not allow incoming connections.

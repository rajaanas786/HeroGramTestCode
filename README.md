# Description
As there are few bugs and improvements are required.
-> Like more Uploading file loader
-> Pagination at video list
-> copy url bug needs to be removed on live server

# Due to time finished i could not complete above mentioned imporvemnts
# However my focus remained to complting the autheticationa  security, and deployment as deployement requires more attentions



# Full Stack Application Deployment Guide

This guide provides a detailed step-by-step process for deploying a full-stack application using a React frontend and an Express.js backend on a DigitalOcean server.

---

## Project Overview

### Frontend
- Built with: React.js
- Deployed at: `http://159.65.122.248:3000`

### Backend
- Built with: Node.js, Express.js
- API endpoint: `http://159.65.122.248:5000/api`

---
### You need to run the both backend and frontend on deployment server

## Prerequisites

1. **DigitalOcean Droplet Information**:
   - **IP Address**: `159.65.122.248`
   - **Username**: `root`
   - **Password**: `jikodf13bBb!!!!qqq`

2. **Tools Required**:
   - Git installed locally and on the server.
   - Node.js and npm installed on the server.
   - PM2 for managing backend services.
   - Nginx as the reverse proxy.

3. **Git Repository**:
   - The project code is stored in a GitHub repository.

---

## Deployment Instructions

### Step 1: Connect to the Server
- Use SSH to access the server:
  ```bash
  ssh root@159.65.122.248

 

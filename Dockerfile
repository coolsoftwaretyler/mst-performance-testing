# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Install time (used for benchmarking)
RUN apt-get update && apt-get install -y time libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

# Building node-hermes
# Install dependencies for building Hermes
RUN apt-get install -y cmake git ninja-build libicu-dev python-is-python3 zip libreadline-dev

# Install dependencies for running Puppeteer
RUN apt-get install -y libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

# Make sure the time command is available as `gtime` to stand for `gnu-time` and work with Mac OS
RUN ln -s /usr/bin/time /usr/bin/gtime

# Clone the Hermes repository
RUN git clone https://github.com/facebook/hermes.git

# Build Hermes with node-hermes support
RUN cd hermes && \
    cmake -S . -B build_release -G Ninja -DCMAKE_BUILD_TYPE=Release -DHERMES_BUILD_NODE_HERMES=ON && \
    ninja -C build_release

# Add node-hermes binary to the PATH
ENV PATH="/app/hermes/build_release/bin:${PATH}"

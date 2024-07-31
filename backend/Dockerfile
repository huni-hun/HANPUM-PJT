FROM openjdk:17-slim

WORKDIR /app

COPY . /app

RUN chmod +x ./gradlew

RUN ./gradlew clean bootJar -x test

ARG JAR_FILE=build/libs/*.jar

RUN cp ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "./app.jar"]
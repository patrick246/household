FROM maven:3-jdk-11 as builder
WORKDIR /app
COPY . .
RUN mvn clean install

FROM adoptopenjdk/openjdk11:jre-11.0.5_10-alpine
WORKDIR /app
COPY --from=builder /app/target/household-inventory-*.jar /app/app.jar

CMD ["java", "-jar", "/app/app.jar"]

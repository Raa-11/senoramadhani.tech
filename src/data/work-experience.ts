import type { WorkExperience } from "../models/work-experience";

export const workExperiences: WorkExperience[] = [
    {
        company: "PT. Sigma Cipta Caraka",
        location: "Bandung, ID",
        position: "Backend Developer",
        type: "onsite",
        time: "full-time",
        period: [new Date(2022, 7), null],
        details: [
            "Developed REST API backend from scratch with golang",
            "Designed the database schema along with other developer",
            "Create CI/CD pipeline with Gitlab CI/CD",
            "Used Docker and Kubernetes for deploy to Openshift",
            "Used database PostgreSQL and Redis",
            "Used K6 Load Testing for performance testing",
        ],
        technologies: [
            "golang",
            "docker",
            "k6 load testing",
            "postgresql",
            "redis",
            "appdynamics",
            "jmeter",
            "kubernetes",
            "openshift",
            "elasticsearch",
            "fluentbit",
            "redpanda",
            "logstash",
            "kibana",
            "harbor",
            "sonarqube",
            "opentelemetery",
            "grafana",
            "tempo",
            "pulumi",
            "gitlab ci/cd"
        ],
    }
];
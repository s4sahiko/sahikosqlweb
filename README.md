# sahikosql

`sahikosql` is an Android application designed for security testing and automated SQL injection vulnerability analysis. Built on Kotlin and Coroutines, the application provides an enterprise-grade interface to crawl Web endpoints, detect SQL injection entry points, and execute chunked payload data extraction.

---

## Executive Overview

`sahikosql` combines security testing capabilities with an aggressive high-contrast dark interface. It enables authorized security professionals and developers to assess web application endpoint security against structured SQL injection attack vectors.

---

## Key Features

### Security Engine & Detection
* **Automated Target Crawling**: Discovers endpoints, URL query parameters, and form submission fields.
* **Multi-Vector Injection Testing**: Scans for Union-Based, Error-Based, and Boolean-Blind SQL injection patterns.
* **Schema & Database Identification**: Determines target database engine signatures (MySQL, PostgreSQL, SQLite, MS SQL Server, Oracle).
* **Chunked Extraction Engine**: Employs marker-delimited payload processing (`[SQLI_START]`/`[SQLI_END]`) to dump database schema and row records while managing memory overhead.

### Interface & User Experience
* **High-Contrast Glassmorphism Palette**: Minimalist monochrome styling (`#000000` pitch background, `#121212` glass containers, translucent borders).
* **Full-Screen Data Extractor**: Displays extracted database tables in a full-screen scrollable layout with horizontal and vertical matrix views.
* **Integrated HUD Output**: Offers real-time log monitoring with toggle controls (`Hide`/`Show`).
* **Clipboard Data Export**: Provides single-click data copying for security reports and auditing documentation.

---


## Prerequisites

* **Android SDK**: API Level 24 (Android 7.0) or higher
* **Target SDK**: API Level 34
* **Build System**: Gradle 8.x with Kotlin 1.9+
* **JDK Version**: OpenJDK 17 or OpenJDK 21

---



## Usage Workflow

1. **Target Specification**: Enter the target URL or hostname (e.g., `http://target-application.local/page.php?id=1`).
2. **Initiate Scan**: Tap **Start Scan** to begin endpoint crawling and vulnerability probing.
3. **Monitor Progress**: View log entries in the HUD terminal window or hide the terminal via the **Hide** button.
4. **Data Extraction**: For identified Union-Based vulnerabilities, select **Extract All Data** to initiate database dump operations.
5. **Review Results**: Tap **View Extracted Data** to display full-screen database tables and export raw data using **Copy Data**.

---

## Legal & Compliance Disclaimer

Usage of `sahikosql` for testing target web applications without explicit prior authorization from the application owner is strictly prohibited. Users are responsible for complying with all applicable local, national, and international cybersecurity laws. The developers assume no liability for misuse or unauthorized activities performed using this tool.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

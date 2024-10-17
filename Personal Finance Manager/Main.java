//Work in progress
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.addStaticFiles("/public");
            config.enableCorsForAllOrigins();
        }).start(7000);

        app.routes(() -> {
            path("transactions", () -> {
                get(ctx -> getAllTransactions(ctx));
                post(ctx -> addTransaction(ctx));
                path(":id", () -> {
                    get(ctx -> getTransaction(ctx));
                    put(ctx -> updateTransaction(ctx));
                    delete(ctx -> deleteTransaction(ctx));
                });
            });
            path("report", () -> {
                get(ctx -> getSummaryReport(ctx));
            });
            path("export", () -> {
                get(ctx -> exportToCSV(ctx));
            });
        });
    }
}
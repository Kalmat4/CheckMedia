function checkImage() {
    var imageUrl = document.getElementById("imageUrl").value;
    var url = "https://api.edenai.run/v2/image/explicit_content";
    var jsonPayload = {
        "providers": "google",
        "file_url": imageUrl,
        "fallback_providers": ""
    };

    var headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzQwOTBhY2MtNzhlNC00NTBlLTlkNTAtNThiN2YxZmJmNGEyIiwidHlwZSI6ImFwaV90b2tlbiJ9.Noxx9xKYQIWoGDAo1GCzJYP-Y4b5g8zY6R5156LKkLs"
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(jsonPayload)
    })
    .then(response => response.json())
    .then(result => {
        if ('google' in result && 'items' in result['google']) {
            var googleItems = result['google']['items'];
            for (var i = 0; i < googleItems.length; i++) {
                if (googleItems[i]['label'] === 'Adult' && googleItems[i]['likelihood'] > 2) {
                    document.getElementById("result").textContent = "Этот контент для взрослых.";
                    break;
                }
            }
            if (i === googleItems.length) {
                document.getElementById("result").textContent = "Этот контент нормальный.";
            }
        } else {
            document.getElementById("result").textContent = "Не удалось получить данные от Google.";
        }
    })
    .catch(error => {
        document.getElementById("result").textContent = "Произошла ошибка при отправке запроса: " + error;
    });
}

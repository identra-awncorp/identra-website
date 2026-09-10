# Thuật ngữ SSI tiếng Việt của Identra

Nguồn: `C:\Users\Lenovo\Downloads\SSI Teminology.md`, đã được chủ dự án hiệu chỉnh và xác nhận. Bản tham chiếu này lưu cùng mã nguồn để các lần biên tập sau sử dụng nhất quán.

## Quy tắc áp dụng

- Dùng thuật ngữ theo nghĩa của cả câu; không thay thế hàng loạt chỉ vì trùng từ.
- “Danh tính số” và “định danh số” đều được dùng tùy ngữ cảnh.
- `Verifiable Credential` là “thực chứng”. `Credential` đứng riêng ưu tiên dịch theo ngữ cảnh: chứng chỉ, giấy tờ, thông tin đăng nhập, hoặc thực chứng khi thực sự nói về VC.
- Giữ nguyên tên sản phẩm Credential Issuance, tên Identra Wallet, tiêu chuẩn, định danh kỹ thuật, trường giao thức và mã thực thi.
- “Sự đồng thuận” dùng cho khái niệm consent; động từ thông thường “đồng ý” vẫn được dùng tự nhiên.
- Attestation là “xác nhận”, chẳng hạn “bản xác nhận kiểm toán”. Không đổi những thuật ngữ riêng “định danh tự chứng thực” hoặc “nút chứng thực”.
- Chủ dự án xác nhận: bước ký và niêm phong cuối các demo là phát hành thực chứng (VC). “Credentials” trong CTA tạo thử nghiệm của NFC, liên kết của Database Checks, bảo vệ của Higher Education và bước xác nhận của Business Fraud đều chỉ thực chứng.
- Phân biệt ngữ cảnh truy cập hệ thống: session token là mã phiên hoặc mã truy cập; PIV/CAC là thẻ định danh; hồ sơ nhân sự Okta/Active Directory là thông tin định danh. OAuth client credentials là thông tin xác thực của ứng dụng khách; không gọi những dữ liệu này là thực chứng.
- Chỉ sửa cách diễn đạt và thuật ngữ đã xác định rõ; hỏi chủ dự án khi có nhiều cách hiểu ảnh hưởng đến ý nghĩa hoặc chức năng sản phẩm.
- Nội dung Blog do chủ dự án biên tập được giữ nguyên, bao gồm metadata phải khớp nguyên văn với nội dung bài. Chỉ sửa Blog khi có yêu cầu riêng.

## Bảng thuật ngữ gốc đã thống nhất

Nếu bạn đọc một câu dịch và cảm thấy: "Người Việt không bao giờ nói như vậy" -> nghĩa là câu đó dịch chưa tốt!

Self Sovereign Identity: Định danh Tự chủ, Định danh Phi tập trung
Verifiable credential: Thực chứng
Agent: Tác nhân SSI
SSI wallet: Ví định tín
Agency: đơn vị lưu ký
DID controller: chủ quản DID
DID subject: chủ thể DID
Schema: Lược đồ
Schema overlay: Lớp mô tả bổ sung cho lược đồ
self–certifying identifiers: Định danh tự chứng thực
Key Event Receipt Infrastructure - KERI: Hạ tầng Biên nhận Sự kiện Khóa 
Identity Hub: Trạm dữ liệu định danh

# 1. Thuật ngữ cốt lõi của SSI

| English                                | Thuật ngữ chuẩn đề xuất                                                |
| -------------------------------------- | ---------------------------------------------------------------------- |
| Self-Sovereign Identity (SSI)          | Định danh Tự chủ                                                       |
| Digital Identity                       | Định danh số                                                           |
| Identity Layer                         | Tầng định danh                                                         |
| Identity Model                         | Mô hình định danh                                                      |
| Decentralized Identity                 | Định danh phi tập trung                                                |
| Centralized Identity                   | Định danh tập trung                                                    |
| Federated Identity                     | Định danh liên kết                                                     |
| Identity Provider (IDP)                | Nhà cung cấp định danh                                                 |
| Relying Party (RP)                     | Bên tin cậy                                                            |
| Identity and Access Management (IAM)   | Quản lý định danh và truy cập                                          |
| Sovereign Source Authority             | Chủ quyền đối với Danh tính                                            |
| the seven basic building blocks of SSI | bảy thành phần nền tảng của SSI                                        |
| seven laws of identity                 | Bảy Định luật Định danh                                                |
| Verifiable Presentation                | Bằng chứng trình xuất, bản trình bày thực chứng (bản trình thực chứng) |

---

# 2. Thuật ngữ về thực chứng (Verifiable Credentials)

| English                    | Thuật ngữ chuẩn đề xuất                |
| -------------------------- | -------------------------------------- |
| Verifiable Credential (VC) | **Thực chứng**                         |
| Credential                 | Chứng chỉ (ưu tiên dịch theo ngữ cảnh) |
| Attestation                | Xác nhận (ví dụ: bản xác nhận kiểm toán) |
| Claim                      | Tuyên bố                               |
| Attribute                  | Thuộc tính                             |
| Credential Subject         | Chủ thể của thực chứng                 |
| Issuer                     | **Bên phát hành**                      |
| Holder                     | **Bên nắm giữ**                        |
| Verifier                   | **Bên xác minh**                       |
| Proof                      | **Bằng chứng mật mã**                  |
| Selective Disclosure       | Tiết lộ có chọn lọc                    |
| Credential Revocation      | Thu hồi thực chứng                     |
| Credential Status          | Trạng thái thực chứng                  |
| Credential Schema          | Lược đồ thực chứng                     |
| Credential Definition      | Định nghĩa thực chứng                  |

---

# 3. Thuật ngữ về định danh (DID)

| English                        | Thuật ngữ chuẩn đề xuất        |
| ------------------------------ | ------------------------------ |
| Decentralized Identifier (DID) | **Mã định danh phi tập trung** |
| DID Document                   | Tài liệu DID                   |
| DID Method                     | Phương thức DID                |
| DID Registry                   | Sổ đăng ký DID                 |
| Peer DID                       | DID ngang hàng                 |
| Pairwise DID                   | DID theo cặp                   |
| Public DID                     | DID công khai                  |
| DID Resolution                 | Phân giải DID                  |
| DID Authentication             | Xác thực DID                   |

---

# 4. Thuật ngữ về hạ tầng và mật mã

| English                         | Thuật ngữ chuẩn đề xuất              |
| ------------------------------- | ------------------------------------ |
| Public Key                      | Khóa công khai                       |
| Private Key                     | Khóa bí mật                          |
| Key Pair                        | Cặp khóa mật mã                      |
| Digital Signature               | Chữ ký số                            |
| Cryptographic Proof             | Bằng chứng mật mã                    |
| Zero-Knowledge Proof (ZKP)      | Bằng chứng không tiết lộ (ZKP)       |
| Cryptographic Accumulator       | Bộ tích lũy mật mã                   |
| Public Key Infrastructure (PKI) | Hạ tầng khóa công khai               |
| Decentralized PKI (DPKI)        | Hạ tầng khóa công khai phi tập trung |
| Key Management                  | Quản lý khóa                         |
| Key Rotation                    | Luân chuyển khóa                     |

---

# 5. Thuật ngữ về kiến trúc SSI

| English                  | Thuật ngữ chuẩn đề xuất            |
| ------------------------ | ---------------------------------- |
| SSI Architecture         | Kiến trúc SSI                      |
| SSI Stack                | Kiến trúc nhiều tầng của SSI       |
| Layer                    | Tầng                               |
| Trust Root               | Gốc tin cậy                        |
| Service Endpoint         | Điểm truy cập dịch vụ              |
| Cloud Agent              | Tác nhân lưu trú                   |
| Edge Agent               | Tác nhân cục bộ                    |
| Digital Wallet           | Ví định tín                        |
| Wallet Recovery          | Khôi phục ví                       |
| Connection               | Kết nối SSI                        |
| Peer-to-Peer Connection  | Kết nối ngang hàng                 |
| DIDComm Protocol         | Giao thức DIDComm                  |
| Trust Triangle           | Tam giác tin cậy                   |
| Verifiable Data Registry | Sổ đăng ký dữ liệu có thể xác minh |

---

# 6. Thuật ngữ về hệ sinh thái và quản trị

| English              | Thuật ngữ chuẩn đề xuất           |
| -------------------- | --------------------------------- |
| Governance Framework | Khung quản trị                    |
| Governance authority | Cơ quan quản trị                  |
| Trust Framework      | Khung tin cậy                     |
| Compliance           | Tuân thủ                          |
| Data Privacy         | Quyền riêng tư dữ liệu            |
| Data Protection      | Bảo vệ dữ liệu                    |
| Data Portability     | Khả năng chuyển dữ liệu           |
| Self-Sovereignty     | Quyền tự chủ                      |
| Consent              | Sự đồng thuận                     |
| Verifiable Consent   | Sự đồng thuận có thể xác minh     |
| RegTech              | Công nghệ hỗ trợ quản lý quy định |
| Identity Ecosystem   | Hệ sinh thái định danh            |
| Interoperability     | Khả năng tương tác                |

---

# Một số thuật ngữ bạn đã dùng rất tốt (nên giữ)

| Thuật ngữ bạn dùng         | Đánh giá            |
| -------------------------- | ------------------- |
| Thực chứng                 | rất tốt             |
| Ví định tín                | rất phù hợp với SSI |
| Tác nhân SSI               | chuẩn               |
| Tam giác tin cậy           | đúng                |
| Mã định danh phi tập trung | chuẩn               |
| Lược đồ dữ liệu            | tốt                 |
| Sổ đăng ký thu hồi         | tốt                 |
| Khung quản trị             | chuẩn               |

---

# Gợi ý quan trọng cho toàn bộ bản dịch

# 1. Thuật ngữ về giao thức và hệ sinh thái SSI

| English                                 | Thuật ngữ đề xuất                         |
| --------------------------------------- | ----------------------------------------- |
| DIDComm                                 | Giao thức DIDComm                         |
| Hyperledger Aries                       | Dự án Hyperledger Aries                   |
| Hyperledger Indy                        | Nền tảng Hyperledger Indy                 |
| Sovrin Network                          | Mạng Sovrin                               |
| Decentralized Identity Foundation (DIF) | Tổ chức Decentralized Identity Foundation |
| Internet Identity Workshop (IIW)        | Hội thảo Internet Identity Workshop       |
| Rebooting the Web of Trust (RWOT)       | Sáng kiến Rebooting the Web of Trust      |
| SSI Ecosystem                           | Hệ sinh thái SSI                          |
| Identity Hub                            | Trạm dữ liệu định danh                    |
| Trust Registry                          | Sổ đăng ký tin cậy                        |

---

# 2. Thuật ngữ về kiến trúc SSI

| English              | Thuật ngữ đề xuất       |
| -------------------- | ----------------------- |
| SSI Architecture     | Kiến trúc SSI           |
| SSI Layer            | Tầng kiến trúc SSI      |
| Protocol Layer       | Tầng giao thức          |
| Application Layer    | Tầng ứng dụng           |
| Infrastructure Layer | Tầng hạ tầng            |
| Trust Layer          | Tầng tin cậy            |
| Root of Trust        | Nền tảng tạo sự tin cậy |
| Trust Anchor         | Điểm neo tin cậy        |
| Service Endpoint     | Điểm truy cập dịch vụ   |
| Connection Record    | Hồ sơ kết nối           |

---

# 3. Thuật ngữ mật mã học trong SSI

| English                    | Thuật ngữ đề xuất              |
| -------------------------- | ------------------------------ |
| Zero-Knowledge Proof (ZKP) | Bằng chứng không tiết lộ (ZKP) |
| BBS+ Signature             | Chữ ký BBS+                    |
| CL Signature               | Chữ ký CL                      |
| Selective Disclosure       | Tiết lộ có chọn lọc            |
| Cryptographic Accumulator  | Bộ tích lũy mật mã             |
| Merkle Tree                | Cây Merkle                     |
| Hash Function              | Hàm băm                        |
| Nonce                      | Số ngẫu nhiên một lần          |
| Signature Verification     | Kiểm tra chữ ký số             |
| Key Rotation               | Luân chuyển khóa               |

---

# 4. Thuật ngữ quản lý khóa (rất quan trọng trong SSI)

| English                                 | Thuật ngữ đề xuất                     |
| --------------------------------------- | ------------------------------------- |
| Key Event                               | Sự kiện khóa                          |
| Key Rotation Event                      | Sự kiện luân chuyển khóa              |
| Key Compromise                          | Lộ khóa                               |
| Key Recovery                            | Khôi phục khóa                        |
| Key Escrow                              | Lưu ký khóa                           |
| Key Management                          | Quản lý khóa                          |
| Decentralized Key Management            | Quản lý khóa phi tập trung            |
| Key Event Receipt Infrastructure (KERI) | Hạ tầng biên nhận sự kiện khóa (KERI) |

---

# 5. Thuật ngữ về dữ liệu và ngữ nghĩa

|English|Thuật ngữ đề xuất|
|---|---|
|JSON-LD|JSON-LD|
|Linked Data|Dữ liệu liên kết|
|Semantic Interoperability|Tương thích ngữ nghĩa|
|Controlled Vocabulary|Từ vựng kiểm soát|
|Metadata|Siêu dữ liệu|
|Data Model|Mô hình dữ liệu|
|Verifiable Data Registry|Sổ đăng ký dữ liệu có thể xác minh|

---

# 6. Thuật ngữ blockchain và sổ cái

| English                             | Thuật ngữ đề xuất          |
| ----------------------------------- | -------------------------- |
| Blockchain                          | Công nghệ blockchain       |
| Distributed Ledger                  | Sổ cái phân tán            |
| Distributed Ledger Technology (DLT) | Công nghệ sổ cái phân tán  |
| Permissionless Blockchain           | Blockchain không cấp quyền |
| Permissioned Blockchain             | Blockchain có cấp quyền    |
| Consensus Mechanism                 | Cơ chế đồng thuận          |
| Transaction                         | Giao dịch                  |
| Ledger                              | Sổ cái                     |
| Witnesses                           | Nút chứng thực             |

---

# 7. Thuật ngữ hoạt động trong SSI

| English                 | Thuật ngữ đề xuất    |
| ----------------------- | -------------------- |
| Credential Issuance     | Phát hành thực chứng |
| Credential Presentation | Trình thực chứng     |
| Proof Request           | Yêu cầu bằng chứng   |
| Proof Presentation      | Cung cấp bằng chứng  |
| Credential Revocation   | Thu hồi thực chứng   |
| Credential Verification | Xác minh thực chứng  |

---

# 8. Một số thuật ngữ khác

| English                       | Thuật ngữ đề xuất                                                                                                                                                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Peer-to-peer Protocol         | Giao thức ngang hàng                                                                                                                                                                                                                                |
| Peer DID                      | DID ngang hàng                                                                                                                                                                                                                                      |
| Pairwise DID                  | DID theo cặp                                                                                                                                                                                                                                        |
| Triangulation                 | Tái kết nối thông qua trung gian                                                                                                                                                                                                                    |
| Service Discovery             | Phát hiện dịch vụ                                                                                                                                                                                                                                   |
| Endpoint Migration            | Thay đổi điểm truy cập                                                                                                                                                                                                                              |
| unique identification         | Định danh duy nhất                                                                                                                                                                                                                                  |
| certificate                   | Chứng thư                                                                                                                                                                                                                                           |
| qualified certificate         | Chứng thư đạt chuẩn eIDAS                                                                                                                                                                                                                           |
| single points of failure      | Điểm yếu chí tử                                                                                                                                                                                                                                     |
| identity rights holder        | Chủ thể có quyền đối với danh tính                                                                                                                                                                                                                  |
| digital avatars               | nhân vật số                                                                                                                                                                                                                                         |
| Proxy Account                 | Tài khoản Đại diện                                                                                                                                                                                                                                  |
| Lightweight Identity          | Định danh Tối giản                                                                                                                                                                                                                                  |
| meta transaction              | giao dịch gián tiếp                                                                                                                                                                                                                                 |
| a triple play of cryptography | Khi muốn nhấn mạnh kiến trúc<br>> ba cơ chế mật mã học hoạt động đồng thời<br><br>Khi muốn nhấn mạnh phối hợp<br>> ba thành phần mật mã học phối hợp với nhau<br><br>Khi muốn viết học thuật hơn<br>> sự kết hợp đồng thời của ba cơ chế mật mã học |
| ontology                      | mô hình khái niệm                                                                                                                                                                                                                                   |
| controllership                | Quyền chủ quản                                                                                                                                                                                                                                      |



[[SSI]]
